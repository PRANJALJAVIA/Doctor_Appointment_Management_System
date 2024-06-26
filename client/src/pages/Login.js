import React, { useState } from "react";
import "../Styles/login.css";
import axios from "axios";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../URL";

const Login = () => {
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post(
        `${baseURL}/login`,
        values
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <>
      <div id="loginContainer">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="loginform"
        >
          <h2 id="headerTitle">Login</h2>

          <div className="row">
            <div className="label">
              <Form.Item name="email">
                <input type="email" placeholder="Enter your Email" required />
              </Form.Item>
            </div>
          </div>

          <div className="row">
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

          <div className="link1">
            <Link to="/register" className="m-3">
              {" "}
              New user, Register Here
            </Link>
          </div>

          <div id="button" className="row">
            <button>Log in</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
