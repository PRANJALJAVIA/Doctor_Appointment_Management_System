import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import "../Styles/EditProfileUser.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const EditProfileUser = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const [form] = Form.useForm();

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

  const handleUpdateProfile = async (values) => {
    try {
      const res = await axios.put(
        "http://localhost:9090/api/v1/user/Update-User-Profile",
        { name: values.name, mobile: values.mobile, email: userData.email }
      );
      message.success(res.data.message);
    } catch (error) {
      console.log(error);
      message.error("Failed to update profile. Please try again later.");
    }
  };

  const handleChangePassword = async (values) => {
    console.log("handle change password button clicked");
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData, form]);

  return (
    <>
      <Layout userData={userData} isAdmin={isAdmin} isDoctor={isDoctor}>
        <EditProfileForm userData={userData} onFinish={handleUpdateProfile} />
        <ChangePasswordForm onFinish={handleChangePassword} />
      </Layout>
    </>
  );
};

export default EditProfileUser;

const EditProfileForm = ({ userData, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData, form]);

  return (
    <center>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="edit-profile-form"
      >
        <h1 className="form-title">Edit Profile</h1>
        <Form.Item
          label={<b>Name</b>}
          name="name"
          required
          className="form-item-class"
        >
          <Input type="text" placeholder="Your First Name" required />
        </Form.Item>
        <Form.Item
          label={<b>Phone number</b>}
          name="mobile"
          required
          className="form-item-class"
        >
          <Input type="text" placeholder="Mobile number" required />
        </Form.Item>
        <button className="button-class" type="submit">
          Update Profile
        </button>
      </Form>
    </center>
  );
};

const ChangePasswordForm = ({ onFinish }) => {
  return (
    <center>
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="change-password-form"
      >
        <h1 className="form-title">Change Password</h1>
        <Form.Item
          label={<b>New Password</b>}
          name="password"
          required
          className="form-item-class"
        >
          <Input.Password
            placeholder="Enter new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          label={<b>Confirm Password</b>}
          name="confirm_password"
          required
          className="form-item-class"
        >
          <Input.Password
            placeholder="Confirm password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <button className="button-class" type="submit">
          Change Password
        </button>
      </Form>
    </center>
  );
};
