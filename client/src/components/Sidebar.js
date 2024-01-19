import React from "react";
import "../Styles/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { SidebarUser, SidebarAdmin, SidebarDoctor } from "./Data";
import { message } from "antd";


const Sidebar = ({ isAdmin, isDoctor, userData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
        <div className="sidebar">
            <div className="user-name">Welcome, {userData?.name} <br/></div>
            {generateSidebarContent(isAdmin, isDoctor)}
        </div>    
    </>
  );
};

const generateSidebarContent = (isAdmin, isDoctor) => {
    const sidebarData = isAdmin ? SidebarAdmin : isDoctor ? SidebarDoctor : SidebarUser;
  
    return (
      <div className="sidebar-content">
        {sidebarData.map((item, index) => (
          <Link to={item.path} key={index}>
            <div className="sidebar-item">
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    );
};

export default Sidebar;
