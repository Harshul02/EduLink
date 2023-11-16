import React from "react";
import { Link } from "react-router-dom";
const Request = ({request, onAccept, onReject,token,userType}) => {
  const linkTo = userType === "college" ?
    `/companypage/${request.senderId}/companyabout` :
    `/collegepage/${request.senderId}/collegeabout`;
  return (

    <div
      className="request"
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor:'#b6d7f0',
        borderRadius:'4px'
      }}
    >
      <h4
        style={{
          flex: "1",
          fontSize: "18px",
          color: "#333",
          marginBottom: "0",
        }}
        className="text-capitalize"
      >
        {request.senderName}
      </h4>

      <div style={{ display: "flex", alignItems: "center" }}>

      <Link
          to={linkTo}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginRight: "10px",
            textDecoration: "none",
          }}
          title="View Details"
        >
          <i class="bi bi-box-arrow-up-right"></i>
        </Link>

        <button
          onClick={() => onAccept(request._id,request.senderId)}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginRight: "10px",
          }}
          title="Accept Request"
        >
          <i class="bi bi-check-lg"></i>{" "}
        </button>
        <button
          onClick={() => onReject(request._id,request.senderId)}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          title = "Reject Request"
        >
          <i class="bi bi-x-lg"></i>{" "}
        </button>

        
      </div>
    </div>
  );
};

export default Request;
