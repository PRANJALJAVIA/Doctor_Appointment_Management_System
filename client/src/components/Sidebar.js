import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SidebarUser, SidebarAdmin, SidebarDoctor } from "./Data";
import { message } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faList, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isAdmin, isDoctor, userData, pathname }) => {
 
  const navigate = useNavigate();
  const location = useLocation();

    const handleLogout = () => {
      localStorage.clear();
      message.success("Logout Successfully");
      navigate("/login");
    };  

  return (
    <>
        <div className="sidebar">
            <div className="user-name">Welcome, {userData?.name} <br/></div>
            {GenerateSidebarContent(isAdmin, isDoctor, handleLogout, pathname)}
        </div>    
    </>
  );
};

const GenerateSidebarContent = (isAdmin, isDoctor, handleLogout, pathname) => {
    const sidebarData = isAdmin ? SidebarAdmin : isDoctor ? SidebarDoctor : SidebarUser;

    return (
      <>
        <div className="sidebar-content">
          {sidebarData.map((item, index) => (
            <Link to={item.path} key={index}>
              <div className={`sidebar-item ${item.path === pathname ? 'active' : ''}`}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="sidebar-content" onClick={handleLogout}>
            <Link to="/login"><div className="sidebar-item"><FontAwesomeIcon icon="fa-regular fa-right-from-bracket" /><span>Logout</span></div></Link>
        </div>
      </>
    );
};

export default Sidebar;
