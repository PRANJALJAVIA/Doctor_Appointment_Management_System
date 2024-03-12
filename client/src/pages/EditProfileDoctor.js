import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import moment from "moment";
import Layout from "../components/Layout";
import "../Styles/EditProfileDoctor.css";

const EditProfileDoctor = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const [docData, setDocData] = useState({});

  const [editProfileForm] = Form.useForm();

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      //converting timings into array of strings
      const timingsArray = [values.timings[0]._i, values.timings[1]._i];

      const res = await axios.put(
        "http://localhost:9090/api/v1/user/Update-Doctor-Profile",
        {
          docId: userData._id,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
          specialization: values.specialization,
          experience: values.experience,
          feesPerConsultant: values.feesPerConsultant,
          timings: timingsArray,
          website: values.website,
        }
      );

      message.success(res.data.message);
    } catch (error) {
      console.log(error);
      message.error("Failed to update profile. Please try again later.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      getDocProfile(userData._id);
    }
  }, [userData]);

  useEffect(() => {
    if (Object.keys(docData).length !== 0) {
      // console.log(moment(docData.timings[0], "HH:mm"));

      // const date1 = new Date(docData.timings[0]);
      // const StartTime = date1.toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: false,
      // });

      // const date2 = new Date(docData.timings[1]);
      // const EndTime = date2.toLocaleTimeString([],{
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: false,
      // });


      const initialValues = {
        firstName: docData.firstName,
        lastName: docData.lastName,
        phone: docData.phone,
        address: docData.address,
        email: docData.email,
        specialization: docData.specialization,
        experience: docData.experience,
        feesPerConsultant: docData.feesPerConsultant,
        timings: [
          moment(docData.timings[0]),
          moment(docData.timings[1]),
          // moment(StartTime, 'HH:mm'),
          // moment(EndTime, 'HH:mm'),
        ],
      };
      
      // console.log(moment(StartTime, 'HH:mm'))
      // console.log(moment(EndTime, 'HH:mm'))

      if (docData.hasOwnProperty("website")) {
        initialValues.website = docData.website;
      }

      editProfileForm.setFieldsValue(initialValues);
    }
  }, [docData, editProfileForm]);

  return (
    <>
      <Layout userData={userData} isAdmin={isAdmin} isDoctor={isDoctor}>
        <EditProfileForm
          doctorData={docData}
          form={editProfileForm}
          onFinish={handleUpdateProfile}
        />
      </Layout>
    </>
  );
};

export default EditProfileDoctor;

const EditProfileForm = ({ doctorData, form, onFinish }) => {
  console.log(doctorData.timings);

  useEffect(() => {
    form.setFieldsValue(doctorData);
  }, [doctorData, form]);

  return (
    <>
      <center>
        <h1 className="text-center">Edit Profile</h1>
        <hr className="underline-apply-doctor" />
      </center>

      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className="row-class"
        >
          <h3 style={{ marginLeft: "10px" }}>Personal Details :-</h3>

          <Row className="row-class">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>First Name</b>}
                name="firstName"
                required
                className="form-item-class"
              >
                <Input
                  type="text"
                  placeholder="Your First Name"
                  required
                ></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Last Name</b>}
                name="lastName"
                className="form-item-class"
                required
              >
                <Input
                  type="text"
                  required
                  placeholder="Your Last Name"
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row className="row-class">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Phone number</b>}
                name="phone"
                className="form-item-class"
                required
              >
                <Input
                  type="text"
                  placeholder="Your Contact no"
                  required
                ></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Address</b>}
                name="address"
                className="form-item-class"
                required
              >
                <Input type="text" placeholder="Your Address" required></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row className="row-class">
            {/* <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Email</b>}
                name="email"
                className="form-item-class"
                required
              >
                <Input type="email" placeholder="Your Email" required></Input>
              </Form.Item>
            </Col> */}

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Website</b>}
                name="website"
                className="form-item-class"
              >
                <Input
                  type="text"
                  placeholder="Your Website"
                  width={500}
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <h3>Profession Details :- </h3>
          <Row className="row-class">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Specealization </b>}
                name="specialization"
                required
                className="form-item-class"
              >
                <Input
                  type="text"
                  required
                  placeholder="Your Specialization"
                ></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Experience</b>}
                name="experience"
                required
                className="form-item-class"
              >
                <Input
                  type="number"
                  required
                  placeholder="Your Experience"
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row className="row-class">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>fees Per consultant</b>}
                name="feesPerConsultant"
                className="form-item-class"
                required
              >
                <Input type="number" required placeholder="Your Fees"></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Timing</b>}
                name="timings"
                className="form-item-class"
                required
              >
                {doctorData.timings && (
                  <TimePicker.RangePicker
                    format="HH:mm"
                    value={[
                      moment(doctorData.timings[0], "HH:mm"),
                      moment(doctorData.timings[1], "HH:mm"),
                    ]}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* <Link to="/login" className="m-3">already user login here</Link> */}
          <center>
            <button type="submit" className="button-class">
              Edit Profile
            </button>
          </center>
        </Form>
      </div>
    </>
  );
};
