import React, { useState } from "react";
import axios from "axios";
import "../Styles/RegisterStyles.css";
import { Form, message, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    console.log(values)
    try {
      const res = await axios.post(
        "http://localhost:9090/api/v1/user/register",
        values
      );

      if (res.data.success) {
        message.success("Register successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Form onFinish={onfinishHandler} layout="vertical" className="registerform">
        <div id="registerform">
          <h2 id="headerTitle">Register</h2>

          <div className="row">
            <div className="label">
              <Form.Item name="name">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  required
                ></input>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="label">
              <Form.Item name="email">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  required
                ></input>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="label">
              <Form.Item name="password">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                ></input>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="label">
              <Form.Item name="mobile">
                <input
                  type="text"
                  placeholder="Enter your Mobil number"
                  required
                ></input>
              </Form.Item>
            </div>
          </div>

          <div className="link1" >
            <Link to="/login" className="m-3">Already have an account, login here</Link>
          </div>

          <div id="button" class="row">
            <button>Register</button>
          </div>
        </div>
      </Form>
    </>
  );
};
export default Register;
