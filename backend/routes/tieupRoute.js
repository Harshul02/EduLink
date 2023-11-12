const express = require('express');
const router = express.Router();
const TieUp = require('../models/tieupModel');
const companymodel = require('../models/companyModel');
const collegemodel = require('../models/collegeModel');
const rejectionModel = require('../models/RejectionCountModel');


router.post('/request', async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    
    const existingTieUp = await TieUp.findOne({
      $or: [
        { senderId, receiverId, accepted: true },
        { senderId: receiverId, receiverId: senderId, accepted: true },
        { senderId: receiverId, receiverId: senderId, accepted: false},
        { senderId,receiverId, accepted: false },
      ]
    });

    if (existingTieUp) {
      return res.json({ success: false, message: 'They Already sent Request Check Inbox'});
    }

    
    const newTieUp = new TieUp({
      senderId,
      receiverId,
      accepted: false,
    });

    await newTieUp.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send tie-up request' });
  }
});


  
  
   router.post('/respond', async (req, res) => {
    const { requestId,senderid, accepted , token } = req.body;
    console.log(token);
  
    try {
      let updatedtieup;
      if (accepted === false) {
        await TieUp.findByIdAndDelete(requestId);
        const rejectionCountEntry = await rejectionModel.findOne({ fromId: senderid , toId: token });

            if (rejectionCountEntry) {
                rejectionCountEntry.rejectionCount += 1;
                await rejectionCountEntry.save();
            } else {
               const newrejectionmodel = new rejectionModel({ fromId: senderid, toId:token, rejectionCount: 1 });
               await newrejectionmodel.save();
            }
      } else {
        const temprejectionCountEntry = await rejectionModel.findOne({ fromId: senderid , toId: token });
        console.log(temprejectionCountEntry);
        if (temprejectionCountEntry) {
          temprejectionCountEntry.rejectionCount = 0;
          await temprejectionCountEntry.save();
      }

        updatedtieup = await TieUp.findByIdAndUpdate(requestId, { accepted });
      }
  
      res.json({ 
          success: true, 
          tieUp : updatedtieup
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to respond to tie-up request' });
    }
  });
  
  router.get('/pending/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const pendingRequests = await TieUp.find({
        $and: [
          { receiverId: userId },
          { accepted: false },
        ],
      }).exec();

      const userpendingTieUps = await TieUp.find({ senderId: userId, accepted: false });

      const NamesOfRequestSender = [];
      for (const sender of pendingRequests) {
        const senderName = await getEntityName(sender.senderId);
        NamesOfRequestSender.push({ ...sender.toObject(), senderName });
      }

      console.log(NamesOfRequestSender);

      const userPendingTieUpsSize = userpendingTieUps.length || 0;


  
      res.json({ success: true, pendingRequests: NamesOfRequestSender, userPendingTieUpsSize });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to fetch pending requests' });
    }
  });

  router.get('/accepted/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const acceptedTieUps = await TieUp.find({
        $or: [
          { senderId: userId, accepted: true },
          { receiverId: userId, accepted: true },
        ],
      });

      const useracceptedTieUps = await TieUp.find({ senderId: userId, accepted: true });
      
      const populatedTieUps = [];

      for (const tieUp of acceptedTieUps) {
        const senderName = await getEntityName(tieUp.senderId);
        const receiverName = await getEntityName(tieUp.receiverId);
        populatedTieUps.push({ ...tieUp.toObject(), senderName, receiverName });
      }

      console.log(populatedTieUps);
      
      const userAcceptedTieUpsSize = useracceptedTieUps.length || 0;

      res.json({ success: true, acceptedTieUps: populatedTieUps, userAcceptedTieUpsSize });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to fetch accepted tie-ups' });
    }
});

  router.get('/getRejectionCount/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const rejectionCounts = await rejectionModel.find({ fromId: userId });
      
      const totalRejectionCount = rejectionCounts.reduce((sum, entry) => sum + entry.rejectionCount, 0);

      const finalRejectionCount = rejectionCounts.length > 0 ? totalRejectionCount : 0;
      console.log(finalRejectionCount);
  
      res.json({
        success: true,
        finalRejectionCount
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to retrieve rejection count' });
    }
});


router.get('/statuscheck/:userId/:rId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const rId = req.params.rId;
    const tieUp = await TieUp.findOne({ 
    $or:[
        {senderId: rId, receiverId: userId},
        {senderId: userId, receiverId: rId} 
      ]});
    console.log(tieUp)
    if (tieUp) {
      res.json({ success: true, accepted: tieUp.accepted });
    } else {
      res.json({ success: false, message: 'Tie-up not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

  
  
  async function getEntityName(entityId) {
    try {
      const company = await companymodel.findById(entityId).select('companyName').exec();
      if (company) {
        return company.companyName;
      }
  
      const college = await collegemodel.findById(entityId).select('collegeName').exec();
      if (college) {
        return college.collegeName;
      }
  
      return 'Unknown Entity'; 
    } catch (error) {
      console.error(error);
      return 'Unknown Entity';
    }
  }


  module.exports = router;