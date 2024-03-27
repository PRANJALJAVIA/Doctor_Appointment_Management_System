import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message, Form, Select, DatePicker } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../Styles/BookAppointment.css";
import moment from "moment";

const { Option } = Select;

//for timing slots
var timeSlots = [];
const generateTimeSlots = (start, end, interval) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  console.log(
    startTime.getHours().toString() + ":" + startTime.getMinutes().toString()
  );

  while (startTime <= endTime) {
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

  const [docData, setDocData] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [date, setDate] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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
    if (startTime !== null && endTime !== null) {
      console.log(startTime);
      console.log(endTime);
      generateTimeSlots(startTime, endTime, 60);
    }
  }, [startTime, endTime]);

  const onfinishHandler = async (values) => {
    try {
      const timing = selectedTime;
      const userEmail = userData.email;
      const docId = docData._id;
      const uName = userData.name;

      //formatting date
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
      const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed

      const formattedDate = `${year}-${month}-${day}`;

      const res = await axios.post(
        "http://localhost:9090/api/v1/user/check-availibility",
        {
          timing: timing,
          date: formattedDate,
          userEmail: userEmail,
          docId: docId,
          userName: uName,
          year: year,
          month: month,
          day: day,
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        // navigate('/login')
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData} pathname={location.pathname}>
      <div className="doctor-details-container">
        <center>
          <h1>
            Dr. {docData.firstName} {docData.lastName}
          </h1>
          ({docData.specialization})
          <hr className="underline" />
          <table style={{ marginTop: "20px" }}>
            <tbody>
              <tr>
                <td className="tag">Address :</td>
                <td>{docData.address}</td>
              </tr>
              <tr>
                <td className="tag">Phone number :</td>
                <td>{docData.phone}</td>
              </tr>
              <tr>
                <td className="tag">Fees Per Consultant :</td>
                <td>{docData.feesPerConsultant}</td>
              </tr>
              <tr>
                <td className="tag">Experience (in years):</td>
                <td>{docData.experience}</td>
              </tr>
              {docData.website && (
                <tr>
                  <td className="tag">Website :</td>
                  <td>{docData.website}</td>
                </tr>
              )}
              <tr>
                <td className="tag">
                  <b>Timings:</b>
                </td>
                <td>
                  {docData?.timings?.map((time, index) => {
                    const date = new Date(time);
                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");

                    return (
                      <span key={index}>
                        {hours}:{minutes} {index === 0 && "to "}
                      </span>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <b className="tag">Address : </b> {docData.address} <br />
          <b className="tag">Phone number : </b> {docData.phone} <br />
          <b className="tag">Fees Per Consultant : </b> {docData.feesPerConsultant} <br />
          <b className="tag">Experience (in years): </b> {docData.experience} <br />
          {docData.website && (
            <>
              <b>Website : </b> {docData.website} <br />
            </>
          )} */}
          {/* <b>Timings: </b>
          {docData?.timings?.map((time, index) => {
            const date = new Date(time);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return (
              <span key={index}>
                {hours}:{minutes} {index === 0 && "to "}
              </span>
            );
          })} */}
          <br />
          <Form
            layout="vertical"
            onFinish={(values) => onfinishHandler(values)}
            className="register_form"
          >
            <div className="form-row">
              <label htmlFor="date">Date: 
              <DatePicker name="date" id="date" value={selectedDate} onChange={(date) => setSelectedDate(date)} placeholder="Select date" />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="timing">Timing:</label>
              {timeSlots.length > 0 && (
                <Select id="timing" placeholder="Select time" value={selectedTime} onChange={(value) => setSelectedTime(value)}>
                  {timeSlots.map((timeSlot, index) => (
                    <Option key={index} value={timeSlot}>
                      {timeSlot}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            <button className="book-appointment-button" type="submit">
              Book appointment
            </button>
          </Form>
        </center>
      </div>
    </Layout>
  );
};

export default BookAppointment;
