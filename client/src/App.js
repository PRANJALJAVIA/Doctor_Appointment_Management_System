import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import DoctorList from "./pages/DoctorList";
import AppointmentUser from "./pages/AppointmentUser";
import BookAppointment from "./pages/BookAppointment";
import AppointmentDoctor from "./pages/AppointmentDoctor";
import EditProfileUser from "./pages/EditProfileUser";
import EditProfileDoctor from "./pages/EditProfileDoctor";
import PredictDisease from "./pages/PredictDisease";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} exact index/>       
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}  />
          <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
          <Route path="/doctors-list" element={<ProtectedRoute> <DoctorList/> </ProtectedRoute>} />  
          <Route path="/appointment-user" element={<ProtectedRoute> <AppointmentUser/> </ProtectedRoute>} />    
          <Route path="/book-appointment/:id" element={<ProtectedRoute> <BookAppointment/> </ProtectedRoute>} />   
          <Route path="/appointment-doctor" element={<ProtectedRoute> <AppointmentDoctor/> </ProtectedRoute>} /> 
          <Route path="/user-profile" element={<ProtectedRoute> <EditProfileUser /> </ProtectedRoute>}/>  
          <Route path="/doctor-profile" element={<ProtectedRoute> <EditProfileDoctor /> </ProtectedRoute>}></Route>
          <Route path="/predict-my-disease" element={<ProtectedRoute> <PredictDisease /> </ProtectedRoute>}></Route>
        </Routes>
      </Router>  
    </>
  );
}

export default App;
