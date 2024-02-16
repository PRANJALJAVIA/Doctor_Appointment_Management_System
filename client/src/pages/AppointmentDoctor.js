import React,{useState, useEffect} from 'react'
import axios from "axios";
import Layout from "../components/Layout";

function AppointmentDoctor() {
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDoctor, setIsDoctor] = useState(false);
    const [AppointmentList, setAppointmentList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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

      getAppointmentList(res?.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentList = async (uId)=> {
    try{
        const res = await axios.post("http://localhost:9090/api/v1/user/getAppointmentList", {userId: uId});
        setAppointmentList(res?.data.data);
        
    }
    catch(error){
        console.log(error);
    }
  };

  //for approve button
  const onfinishHandler1 = async (time, date, docId, userEmail)=> {
    console.log(time, date, docId)

    const res = await axios.post("http://localhost:9090/api/v1/user/approve-appointment",{
      timing: time,
      date: date,
      docId: docId,
      userEmail: userEmail,
    });

    if (res.status === 200) {
      // Update the appointment list only if the status is 200
      await getAppointmentList(userData._id);
    } else {
      console.error("Error approving appointment:", res.message);
    }
  }

  //for reject button
  const onfinishHandler2 = async ()=> {
    
  }

  useEffect(() => {
    getUserData();
    // getAppointmentList()
  }, []);

  return (
    <Layout isAdmin={isAdmin} isDoctor={isDoctor} userData={userData}>
        <center>
            <h1>Appointment List</h1>
        </center>

        <center>
            <input
              className="searchbar"
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </center>

        <div className='home'>
            {AppointmentList
                .filter((appointment)=>
                    `${appointment.userName} ${appointment.userEmail} ${appointment.timing} ${appointment.date} ${appointment.status}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) 
            )
            .map((appointment, index) => {
                return(
                    <div key={index}>
                        <div className='appointmentdata'>
                            <div className='text-dark bg-secondry m-3 border-dark rounded'>
                                <label className='mr-3'>Name : </label>
                                {appointment.userName}
                            </div>

                            <div className='text-dark bg-secondry m-3 border-dark rounded'>
                                <label className='mr-3'>Email : </label>
                                {appointment.userEmail}
                            </div>

                            <div className='text-dark bg-secondry m-3 border-dark rounded'>
                                <label className='mr-3'>Date : </label>
                                {appointment.date}
                            </div>

                            <div className='text-dark bg-secondry m-3 border-dark rounded'>
                                <label className='mr-3'>Timing : </label>
                                {appointment.timing}
                            </div>

                            {appointment.status === false && ( 
                              <div>                              
                                <button onClick={() => onfinishHandler1(appointment.timing, appointment.date, appointment.docId, appointment.userEmail)}>
                                    Approve
                                </button>
                                <br />
                                <br />
                                <button onClick={onfinishHandler2}>
                                    Reject
                                </button>
                              </div>          
                            )} 
                        </div>
                    </div>
                );
            })
            }
        </div>

    </Layout>
  );
}

export default AppointmentDoctor;
