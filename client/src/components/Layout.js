import React from "react";
import { SidebarUser, SidebarAdmin, SidebarDoctor } from "./Data";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import "../Styles/Layout.css"
import Sidebar from "./Sidebar";

const Layout = ({ isAdmin, isDoctor, userData, children }) => {
    const navigate = useNavigate();
    
    const location = useLocation();
    return (
        <>
            <div className="layout-container">
                <Sidebar isAdmin={isAdmin} isDoctor={isDoctor} userData={userData} />
                <div className="main-content">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;


