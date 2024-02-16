import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message, Form, Select, DatePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

//for timing slots
var timeSlots = [];
const generateTimeSlots = (start, end, interval) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  console.log(startTime.getHours().toString() + ":" + startTime.getMinutes().toString());

  while(startTime <= endTime){
    const hours = startTime.getHours().toString().padStart(2, "0");
    const minutes = startTime.getMinutes().toString().padStart(2, "0");
    timeSlots.push(`${hours}:${minutes}`);
    startTime.setMinutes(startTime.getMinutes() + interval);
  }
  console.log(timeSlots);
};

const BookAppointment = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const [docData, setDocData] = useState({})
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [date, setDate] = useState(null);

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

  const getDocProfile = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/v1/user/doctor-profile",
        { DocId: id },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setDocData(res?.data.data);
      setStartTime(res?.data.data.timings[0]);
      setEndTime(res?.data.data.timings[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getDocProfile(id);
  }, [id]);

  useEffect(() => {
    if(startTime !== null && endTime !== null){
      generateTimeSlots(startTime, endTime, 60);
    }
  }, [startTime, endTime]);

  const onfinishHandler = async (values)=> {
    console.log(values)
    try{
      const timing = values.timings
      const userEmail = userData.email
      const docId = docData._id
      const uName = userData.name

      //formatting date
      const date = new Date(values.date)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed

      const formattedDate = `${year}-${month}-${day}`;

      const res = await axios.post("http://localhost:9090/api/v1/user/check-availibility", {
        timing: timing, 
        date: formattedDate,
        userEmail: userEmail,
        docId: docId,
        userName: uName
      });

      if (res.data.success) {
        message.success(res.data.message);
        // navigate('/login')
      } else {
        message.error(res.data.message);
      }
    }
    catch(error){
      console.log(error);
      message.error("Something went wrong");
    }
  }

  return (
    <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData}>
      <center>
        <h1>
          {docData.firstName} {docData.lastName}
        </h1>
        <b>Address : </b> {docData.address} <br />
        <b>Phone number : </b> {docData.phone} <br />
        <b>Specialization : </b> {docData.specialization} <br />
        <b>Fees Per Consultant : </b> {docData.feesPerConsultant} <br />
        <b>Experience (in years): </b> {docData.experience} <br />
        {docData.website && (
          <>
            <b>Website : </b> {docData.website} <br />
          </>
        )}
        <b>Timings: </b>
          {docData?.timings?.map((time, index) => {
            const date = new Date(time);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return(
              <span key={index}>
                {hours}:{minutes} {index===0 && "to "}
              </span>
            );
          })}

          <br />
          <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register_form"
        >
          <Form.Item label="Date" name="date">
            {/* <DatePicker onChange={(e) => setDate(e?.targate.value)} placeholder="Select date" /> <br /> */}
            <DatePicker placeholder="Select date" />
          </Form.Item>

          {/* <Form.Item label="Timing" name="timings">
            <TimePicker format="HH:mm" placeholder="Select time" />
          </Form.Item> */}

          <Form.Item label="Timing" name="timings">
            <Select placeholder="Select time">
              {/* {console.log(timeSlots)} */}
              {timeSlots.map((timeSlot, index) => (
                <Option key={index} value={timeSlot}>
                  {timeSlot}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <button type="submit">Book appointment</button>
        </Form>

      </center>

    </Layout>
  );
};

export default BookAppointment;
