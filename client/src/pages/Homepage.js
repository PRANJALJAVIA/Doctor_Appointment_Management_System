import React,{useState, useEffect} from "react";
import axios from 'axios';
import Layout from "antd/es/layout/layout";
import Sidebar from "../components/Sidebar";

const Homepage = () => {

  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData",{},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setUserData(res?.data.data);
      setIsAdmin((res.data.data).isAdmin)
      setIsDoctor((res.data.data).isDoctor)

      console.log("isAdmin:", isAdmin);
      console.log("isDoctor:", isDoctor);
      console.log("userData:", userData);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
        <Sidebar isAdmin={isAdmin} isDoctor={isDoctor} userData={userData} />
        <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData}>
        {isAdmin ? <AdminHomePage /> : isDoctor ? <DoctorHomePage /> : <UserHomepage />}  
        </Layout>
    </>
  );
}

const UserHomepage = ()=> {
  return(
    <>
    Homepage
    </>
  )
}

const DoctorHomePage = ()=> {
  return(
    <>
    DoctorPage
    </>
  )
}

const AdminHomePage = ()=> {
  return(
    <>
    Adminpage
    </>
  )
}

export default Homepage
