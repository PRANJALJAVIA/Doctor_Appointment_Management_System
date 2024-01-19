import React, { useState } from "react";
import axios from "axios";
import "../Styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/register', values)

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
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register_form"
      >
        <div id="loginform">
          <h2 id="headerTitle">Register</h2>

          <div class="row">
            <div className="label">
              <Form.Item name="name">
                <input type="text" placeholder="Enter your Name" required />
              </Form.Item>
            </div>
          </div>

          <div class="row">
            <div className="label">
              <Form.Item name="email">
                <input type="email" placeholder="Enter your Email" required />
              </Form.Item>
            </div>
          </div>

          <div class="row">
            <div className="label">
              <Form.Item name="password">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  required
                />
              </Form.Item>
            </div>
          </div>

          <div class="row">
            <div className="label">
              <Form.Item name="mobile">
                <input type="text" placeholder="Enter your Mobile" required />
              </Form.Item>
            </div>
          </div>

          <div className="link1">
            <Link to="/login" className="m-3">
              Already user login here
            </Link>
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
