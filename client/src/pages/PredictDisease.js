import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Form, Input, message, Row } from "antd";
import Layout from "../components/Layout";

const PredictDisease = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const [predictedDisease, setPredictedDisease] = useState();

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

  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/predict", values);

      console.log(res);
      setPredictedDisease(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout userData={userData} isAdmin={isAdmin} isDoctor={isDoctor}>
      <div style={{ padding: 24 }}>
        <h1>Tell me your symptoms</h1>
        <Form
          name="predict-disease-form"
          layout="vertical"
          onFinish={onfinishHandler}
        >
          <Form.Item
            label="Symptoms"
            name="symptoms"
            rules={[{ required: true, message: "Please enter symptoms" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter symptoms" />
          </Form.Item>

          <Form.Item>
            <button type="primary" htmlType="submit">
              Predict
            </button>
          </Form.Item>
        </Form>

        {predictedDisease && (
          <>
            <h2>Predicted Disease: {predictedDisease?.disease}</h2>
            <h3>Description</h3>
            <p>{predictedDisease?.dis_des}</p>

            <div>
              <h3>Medication</h3>
              <ul>
                {predictedDisease?.medications.map((medication, index) => {
                  return <li key={index}>{medication}</li>;
                })}
              </ul>
            </div>

            <div>
              <h3>Precautions</h3>
              <ul>
                {predictedDisease?.precautions.map((precaution, index) => {
                  return <li key={index}>{precaution}</li>;
                })}
              </ul>
            </div>

            <div>
              <h3>Recommanded Diet</h3>
              <ul>
                {predictedDisease?.rec_diet.map((diet, index) => {
                  return <li key={index}>{diet}</li>;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PredictDisease;
