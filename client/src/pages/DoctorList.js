import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Layout from "../components/Layout";
import "../Styles/DoctorList.css";
import { useLocation } from "react-router-dom"

const DoctorList = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [docList, setDocList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

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
      // console.log(docList);
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

  useEffect(() => {
    // This useEffect will be triggered whenever docList is updated
    console.log(docList);
  }, [docList]);

  const approveDoc = async (values) => {
    console.log(values);
    const res = await axios.put(
      "http://localhost:9090/api/v1/user/approve-doctor",
      { userId: values }
    );
    
    if(res.status == 200){
      await getDocList();
      message.success(res.data.message);
    }
    else{
      console.error("Error approving appointment:", res.message);
    }

    
  };

  return (
    <>
      <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData} pathname={location.pathname}>
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
                `${doc.firstName} ${doc.lastName} ${doc.email} ${doc.specialization} ${doc.phone} ${doc.status}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((doc, index) => {
                return (
                  <div key={index}>
                    <div className="doctordata">
                      <div className="DoctorName">
                        Dr. {doc.firstName} {doc.lastName}
                      </div>

                      <div className="specialization">
                        ({doc.specialization})
                      </div>

                      <hr className="underline" />

                      <div
                        className="info"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                          Email
                        </div>{" "}
                        : {doc.email}
                      </div>

                      <div
                        className="info"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                          Experience
                        </div>{" "}
                        : {doc.experience}
                      </div>

                      <div
                        className="info"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                          Phone
                        </div>{" "}
                        : {doc.phone}
                      </div>

                      <div
                        className="info"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                          Address
                        </div>{" "}
                        : {doc.address}
                      </div>

                      <div
                        className="info"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                          Status
                        </div>{" "}
                        : {doc.status}
                      </div>

                      <center>
                        {doc.status === "pending" && (
                          <button
                            className="button-class"
                            onClick={() => approveDoc(doc.userId)}
                          >
                            Approve
                          </button>
                        )}
                      </center>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      </Layout>
    </>
  );
};

export default DoctorList;
