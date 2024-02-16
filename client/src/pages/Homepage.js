import React, { useState, useEffect } from "react";
import axios from "axios";
// import Layout from "antd/es/layout/layout";
// import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "../Styles/HomePage.css";
import doctorImage from "../Assets/doctor_image.gif";
import svgImage from "../Assets/graph.png";

const Homepage = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/v1/user/getUserData",
        {},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setUserData(res?.data.data);
      setIsAdmin(res.data.data.isAdmin);
      setIsDoctor(res.data.data.isDoctor);

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
      <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData}>
        {isAdmin ? (
          <AdminHomePage />
        ) : isDoctor ? (
          <DoctorHomePage />
        ) : (
          <UserHomepage />
        )}
      </Layout>
    </>
  );
};

const UserHomepage = () => {
  // const [docData, setDocData] = useState([{}]);
  // const navigate = useNavigate();
  // const getDocData = async () => {
  //     try {
  //         const res = await axios.get('/api/v1/user/doctors', {
  //             headers: {
  //                 authorization: localStorage.getItem('token')
  //             }
  //         })
  //         setDocData((res?.data.data).filter(doctor => doctor.status === 'approved'))
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // useEffect(() => {
  //     getDocData();
  // }, [])

  // return (
  //     <>
  //         {docData.map((doc, index) => {
  //             return (
  //                 <div onClick={() => {
  //                     navigate(`/book-appointment/${doc.userId}`)
  //                 }} style={{ cursor: "pointer" }}>
  //                     <li>{doc.firstName}</li>
  //                     <li>{doc.lastName}</li>
  //                     <li>{doc.phone}</li>
  //                     <li>{doc.address}</li>
  //                     <br />
  //                 </div>
  //             )
  //         })}
  //     </>
  // )
  return (
    <>
      <center>
        <h1>Welcome to BookMyClinic</h1>
      </center>
      <div className="container">
        <div className="column1">
          <h2>Your Gateway to Personalized Healthcare</h2>
          <p>
            At BookMyClinic, we are committed to making your healthcare
            experience seamless and personalized. Whether you need to book a
            doctor's appointment or find the right specialist for your symptoms,
            we've got you covered.
          </p>
          <h2>Book Your Appointment</h2>
          <h3>Convenient Appointments, Anytime, Anywhere</h3>
          <p>
            Need to see a doctor? We make it easy for you to book appointments
            at your preferred time. Our user-friendly platform allows you to
            browse through a list of qualified doctors, check their
            availability, and book appointments with just a few clicks.
          </p>
          <h2>Find the Right Specialist</h2>
          <h3>Personalized Recommendations for Your Health Needs</h3>
          <p>
            Experiencing symptoms and unsure about the right specialist? Our
            intelligent recommendation system analyzes your symptoms and
            suggests the most relevant doctor specialists.
          </p>
        </div>
        <div className="column2">
          <div
            className="doctor_image__container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={doctorImage}
              alt="Doctor"
              style={{ width: "60%", height: "auto", minWidth:"250px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DoctorHomePage = () => {
  return <>DoctorPage</>;
};

const AdminHomePage = () => {
  return <>Adminpage</>;
};

export default Homepage;
