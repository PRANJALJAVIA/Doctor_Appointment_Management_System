import React, { useState } from "react";
import axios from "axios";
import "../Styles/RegisterStyles.css";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", formData, {
        headers: {
            "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        message.success("Registered successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

//   return (
//     <>
//       {/* <Form onFinish={() => onfinishHandler} layout='vertical'>
//                     <Form.Item name="name">
//                         <input type='text' placeholder="Enter your Name" required></input>
//                     </Form.Item>

//                     <Form.Item name="email">
//                         <input type='email' placeholder="Enter your Email" required></input>
//                     </Form.Item>

//                     <Form.Item name="password">
//                         <input type='password' placeholder='Enter your password' required></input>
//                     </Form.Item>

//                     <Form.Item name="mobile">
//                         <input type='text' placeholder='Enter your Mobil number' required></input>
//                     </Form.Item>

//                     <div className='login_link'>
//                         <Link to="/login">Already have an account, login here</Link>
//                     </div>

//                     <div id="button">
//                         <button type='submit'>Register</button>
//                     </div>
//             </Form> */}

//       <form onSubmit={handleSubmit} method="post">
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter name"
//           onChange={handleChange}
//         />

//         <br />
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           onChange={handleChange}
//         />

//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           onChange={handleChange}
//         />
//         <br />

//         <input
//           type="tel"
//           name="mobile"
//           placeholder="Enter mobile number"
//           onChange={handleChange}
//         />

//         <br />

//         <button type="submit">Register</button>
//       </form>
//     </>
//   );
    return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Mobile"
        name="mobile"
        rules={[
          { required: true, message: "Please enter your mobile number" },
          {
            pattern: /^[0-9]*$/,
            message: "Please enter a valid mobile number",
          },
        ]}
      >
        <Input placeholder="Enter your mobile number" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
