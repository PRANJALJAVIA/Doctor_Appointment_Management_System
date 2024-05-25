import React, { useState, useEffect } from "react";
import axios from "axios";
// import Layout from "antd/es/layout/layout";
// import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/HomePage.css";
import doctorImage from "../Assets/doctor_image.gif";
import doctorIcon from "../Assets/medical-assistance.png";
import userIcon from "../Assets/user.png";
import patientIcon from "../Assets/patient.png";
import svgImage from "../Assets/graph.png";
import Chart from "react-apexcharts";
import { Form, Input, message } from "antd";
import CountUp from "react-countup";

const Homepage = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

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
      <Layout
        isAdmin={isAdmin}
        isDoctor={isDoctor}
        userData={userData}
        pathname={location.pathname}
      >
        {isAdmin ? (
          <AdminHomePage />
        ) : isDoctor ? (
          <DoctorHomePage userData={userData} />
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
            doctor's appointment or get information of diseases, diet plans,
            medicine, precautions based on your symptoms, we'vs got you covered.
          </p>
          <h2>Book Your Appointment</h2>
          <h3>Convenient Appointments, Anytime, Anywhere</h3>
          <p>
            Need to see a doctor? We make it easy for you to book appointments
            at your preferred time. Our user-friendly platform allows you to
            browse through a list of qualified doctors, check their
            availability, and book appointments with just a few clicks.
          </p>
          <h2>Find the Right Diagnosis</h2>
          <h3>Personalized Recommendations for Your Health Needs</h3>
          <p>
            Experiencing symptoms and unsure about the diseases? Our intelligent
            recommendation system analyzes your symptoms and gives description
            of diseases, proper medicines, proper diet plans and precations
            based on your symptoms.
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
              style={{ width: "60%", height: "auto", minWidth: "250px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DoctorHomePage = ({ userData }) => {
  const currentYear = new Date().getFullYear();
  const [form] = Form.useForm();
  const [state, setstates] = useState(null);
  const [responseData, setResponse] = useState([]);

  // const [state, setstates] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //     },
  //   },
  //   series: [
  //     {
  //       name: "series-1",
  //       data: [30, 40, 45, 50, 49, 60, 70, 91],
  //     },
  //   ],
  // });

  useEffect(() => {
    form.setFieldsValue({
      year: currentYear.toString(),
      month: "None",
    });
  }, []);

  const renderYearOptions = () => {
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    return (
      <>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </>
    );
  };

  const renderMonthOptions = () => {
    const months = [
      "None",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </>
    );
  };

  const onfinishHandler = async (values) => {
    if (values.month == "None") {
      const res = await axios.post(
        "http://localhost:9090/api/v1/user/year-wise-patient-list",
        {
          userId: userData._id,
          year: values.year,
        }
      );

      let MonthVisePatient = Array.from({ length: 13 }, () => 0);

      setResponse(res?.data.data);

      responseData.map((record, index) => {
        const month = parseInt(record.month);
        MonthVisePatient[month] = (MonthVisePatient[month] || 0) + 1;
      });

      setstates({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
        },
        series: [
          {
            name: "Number of patients",
            data: MonthVisePatient,
          },
        ],
      });
    } else {
      const res = await axios.post(
        "http://localhost:9090/api/v1/user/month-wise-patient-list",
        {
          userId: userData._id,
          year: values.year,
          month: values.month,
        }
      );

      setResponse(res?.data.data);

      let DayVisePatientList;
      let Xaxis = [];

      if (
        values.month == "01" ||
        values.month == "03" ||
        values.month == "05" ||
        values.month == "07" ||
        values.month == "08" ||
        values.month == "10" ||
        values.month == "12"
      ) {
        DayVisePatientList = Array.from({ length: 32 }, () => 0);
        for (let i = 1; i <= 31; i++) {
          // Convert the number to a string and pad with leading zeros if necessary
          let day = i.toString().padStart(2, "0");
          Xaxis.push(day);
        }
      } else if (values.month == "02") {
        if (parseInt(values.year) % 4 == 0) {
          DayVisePatientList = Array.from({ length: 30 }, () => 0);
          for (let i = 1; i <= 29; i++) {
            // Convert the number to a string and pad with leading zeros if necessary
            let day = i.toString().padStart(2, "0");
            Xaxis.push(day);
          }
        } else {
          DayVisePatientList = Array.from({ length: 29 }, () => 0);
          for (let i = 1; i <= 28; i++) {
            // Convert the number to a string and pad with leading zeros if necessary
            let day = i.toString().padStart(2, "0");
            Xaxis.push(day);
          }
        }
      } else {
        DayVisePatientList = Array.from({ length: 31 }, () => 0);
        for (let i = 1; i <= 30; i++) {
          // Convert the number to a string and pad with leading zeros if necessary
          let day = i.toString().padStart(2, "0");
          Xaxis.push(day);
        }
      }

      responseData.map((record, index) => {
        const day = parseInt(record.day);
        DayVisePatientList[day] = (DayVisePatientList[day] || 0) + 1;
      });

      setstates({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: Xaxis,
            tickAmount: 10, // Adjust the number of ticks as needed
            labels: {
              rotate: -45, // Rotate the labels to improve readability
              style: {
                fontSize: "12px", // Adjust font size as needed
              },
            },
          },
        },
        series: [
          {
            name: "Number of patients",
            data: DayVisePatientList,
          },
        ],
      });
    }
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onfinishHandler}>
        <center>
          <div>
            <Form.Item className="drop-down" name="year" label="Year">
              <select id="year" placeholder="Select Year">
                {renderYearOptions()}
              </select>
            </Form.Item>
          </div>
          <div>
            <Form.Item className="drop-down" name="month" label="Month">
              <select id="month" placeholder="Select Month">
                {renderMonthOptions()}
              </select>
            </Form.Item>
          </div>

          <div>
            <Form.Item>
              <button className="analysis-button" type="submit">
                Analyse
              </button>
            </Form.Item>
          </div>
        </center>
      </Form>

      {state && (
        <>
          <center>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
          </center>
        </>
      )}
    </>
  );
};

const AdminHomePage = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totaldoctors, setTotalDoctors] = useState(0);
  const [totalPatient, setTotalPatient] = useState(0);

  const getData = async () => {
    const doctorDataRes = await axios.get(
      "http://localhost:9090/api/v1/user/doctor-list",
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );

    const userDataRes = await axios.get(
      "http://localhost:9090/api/v1/user/all-user-data"
    );

    const userData = userDataRes.data.data;
    const doctorData = doctorDataRes.data.data.filter(
      (doctor) => doctor.status === "approved"
    );

    setTotalUser(userData.length - 1);
    setTotalDoctors(doctorData.length);
    setTotalPatient(userData.length - doctorData.length);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <center>
        <div className="card">
          <div className="row-card">
            <div className="column-card">
              <img className="icon" src={userIcon} alt="User Image Icon" />
              <div>Total number of users : </div>
            </div>
            <div className="column-card">
              <div className="total-number">
                <CountUp start={0} end={totalUser} duration={2} />
              </div>
            </div>
          </div>
          <div className="row-card">
            <div className="column-card">
              <img className="icon" src={doctorIcon} alt="Doctor Image Icon" />
              <div>Total number of doctors : </div>
            </div>
            <div className="column-card">
              <div className="total-number">
                <CountUp start={0} end={totaldoctors} duration={2} />
              </div>
            </div>
          </div>
          <div className="row-card">
            <div className="column-card">
              <img
                className="icon"
                src={patientIcon}
                alt="Patient Image Icon"
              />
              <div>Total number of patients : </div>
            </div>
            <div className="column-card">
              <div className="total-number">
                <CountUp start={0} end={totalPatient} duration={2} />
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
};

export default Homepage;
