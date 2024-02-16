import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Layout from "../components/Layout";
import "../Styles/DoctorList.css";

const DoctorList = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [docList, setDocList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    console.log(res.message);
    getDocList();
  };

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
          <center>
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
                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label className="mr-3">First Name : </label>
                          {doc.firstName}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label className="mr-3">Last Name : </label>
                          {doc.lastName}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label>Email :</label>
                          {doc.email}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label>Specialization :</label>
                          {doc.specialization}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label>Experience : </label>
                          {doc.experience}
                        </div>

                        <div className="text-dark bg-secondry m-3 border-dark rounded">
                          <label> Phone : </label>
                          {doc.phone}
                        </div>

                        <div className="text-dark bg-secondry m-3  border-dark rounded">
                          <label> Status : </label>
                          {doc.status}
                        </div>

                        {doc.status === "pending" && (
                          <button onClick={() => approveDoc(doc.userId)}>
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </center>
        </>
      </Layout>
    </>
  );
};

export default DoctorList;
