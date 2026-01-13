import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

// Layouts
import PublicLayout from "./components/PublicLayout";
import Layout from "./components/Layout";

// Public Pages
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import OurMembers from "./components/OurMembers";
import { Contact } from "./components/Contact";
import Skims from "./components/Skims";
import Certificates from "./components/Cerificates";
import RegistrationForm from "./components/RegistrationForm";
import NgoIdCardDemo from "./components/NgoIdCardDemo";
import DonationForm from "./components/DonationForm";
import LoginPage from "./components/LoginPage";
import { useLogin } from "./store/useLogin";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


// Admin Pages
import RegistrationPerson from "./components/RegistrationPerson";
import DonationPerson from "./components/DonationPerson";

const App: React.FC = () => {
  const navigate = useNavigate()

  const {checkAuth,user} = useLogin()
useEffect(() => {
checkAuth()
}, [])


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />


      <Routes>
        {/* 🌐 Public Website */}
        <Route element={<PublicLayout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Gallery />
                <OurMembers />
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skims" element={<Skims />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/card" element={<NgoIdCardDemo />} />
          <Route path="/donate" element={<DonationForm />} />
         <Route
  path="/login"
  element={user ? <Navigate to="/donationPerson" replace /> : <LoginPage />}
/>
        </Route>

        {/* 🛠 Admin Dashboard */}
        <Route element={user?<Layout/>:<LoginPage/>}>
          <Route path="/donationPerson" element={<DonationPerson />} />
          <Route path="/registrationPerson" element={<RegistrationPerson />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
