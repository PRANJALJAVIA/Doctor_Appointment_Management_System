import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import Layout from "../components/Layout";

const ApplyDoctor = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.post("http://localhost:9090/api/v1/user/getUserData",{},
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

  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post("http://localhost:9090/api/v1/user/apply-doctor", values, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        message.success("Register successfully!");
        // navigate('/login')
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };


  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Layout userData={userData} isAdmin={isAdmin} isDoctor={isDoctor}>
        <DocForm onSubmit={onFinishHandler} />
      </Layout>
    </>
  );
};

const DocForm = ({ onSubmit }) => {
  return (
    <>
      <center><h1 className="text-center">Apply Doctor</h1></center>
      <div className="form-container">
        <Form layout="vertical" onFinish={onSubmit} className="m-3">
          <h3 className="">Personal Details :-</h3>

          <Row>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>First Name</b>}
                name="firstName"
                required
                className="m-2"
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
                className="m-2"
                required
              >
                <Input
                  type="text"
                  required
                  placeholder="Your Last Name"
                ></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Phone number</b>}
                name="phone"
                className="m-2"
                required
              >
                <Input
                  type="text"
                  placeholder="Your Contact no"
                  required
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Address</b>}
                name="address"
                className="m-2"
                required
              >
                <Input type="text" placeholder="Your Address" required></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Email</b>}
                name="email"
                className="m-2"
                required
              >
                <Input type="email" placeholder="Your Email" required></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label={<b>Website</b>} name="website" className="m-2">
                <Input
                  type="text"
                  placeholder="Your Website"
                  width={500}
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <br />
          <h3>Profession Details :- </h3>
          <Row>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Specealization </b>}
                name="specialization"
                required
                className="m-2 "
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
                className="m-2"
              >
                <Input
                  type="number"
                  required
                  placeholder="Your Experience"
                ></Input>
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>fees Per consultant</b>}
                name="feesPerConsultant"
                className="m-2"
                required
              >
                <Input type="number" required placeholder="Your Fees"></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label={<b>Timing</b>}
                name="timings"
                className="m-2"
                required
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>

          {/* <Link to="/login" className="m-3">already user login here</Link> */}
          <center>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </center>
        </Form>
      </div>
    </>
  );
};

export default ApplyDoctor;
