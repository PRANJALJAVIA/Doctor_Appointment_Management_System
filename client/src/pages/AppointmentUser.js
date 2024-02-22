import React,{useState, useEffect} from 'react'
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AppointmentUser = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [docList, setDocList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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
    } catch (error) {
      console.log(error);
    }
  };

  const getDocList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/api/v1/user/doctor-list",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log(res?.data.data);
      setDocList(res?.data.data);
    } catch (error) {
      console.log(error);
      message.error("Somthing went wrong");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getDocList();
  }, []);

  return (
    <>
      <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData}>
        <>
          <center>
            <h1>Doctor List</h1>
          </center>
          <center>
            <input
              className="searchbar"
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </center>
          <div className="home">
              {docList
                .filter((doc) =>
                  `${doc.firstName} ${doc.lastName} ${doc.email} ${doc.specialization} ${doc.phone} ${doc.status} ${doc.experience} ${doc.address}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .filter((doc) => doc.status.toLowerCase()==='approved')
                .map((doc, index) => {
                  return (
                    <div key={index}>
                      <div className="doctordata">
                        {/* <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label className="mr-3">First Name : </label>
                          {doc.firstName}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label className="mr-3">Last Name : </label>
                          {doc.lastName}
                        </div> */}

                        <div className="DoctorName">
                          Dr. {doc.firstName} {doc.lastName}
                        </div> 

                        <div className="specialization">
                          ({doc.specialization}) 
                        </div>
                        
                        <hr className="underline" />

                        <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Email</div> : {doc.email}
                        </div>

                        <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Experience</div> : {doc.experience}
                        </div>

                        <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Phone</div> : {doc.phone}
                        </div>

                        <div className="info" style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ fontWeight: 'bold', marginRight: '5px' }}>Address</div> : {doc.address}
                        </div>

                        {/* <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label>Email : </label>
                          {doc.email}
                        </div> */}

                        {/* <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label>Specialization :</label>
                          {doc.specialization}
                        </div> */}

                        {/* <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label>Experience : </label>
                          {doc.experience}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label> Phone : </label>
                          {doc.phone}
                        </div> */}

                        <center>
                          <button className='button-class' onClick={() => {navigate(`/book-appointment/${doc.userId}`)}}>
                            Book Appointment
                          </button>
                        </center>
                      </div>
                    </div>
                  );
                })}
          </div>
        </>
      </Layout>
    </>
  ) 
}

export default AppointmentUser
