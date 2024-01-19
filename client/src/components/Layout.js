import React from "react";
import { SidebarUser, SidebarAdmin, SidebarDoctor } from "/Data";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import Sidebar from "./Sidebar";

const Layout = ({ isAdmin, isDoctor, userData, children }) => {
    const navigate = useNavigate();
    
    const location = useLocation();
    return (
        <>
            
            <div className="main-content">

            </div>
        </>
    );
};

export default Layout;


