import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
import ChildMarriageAwareness from "./components/ChildMarriageAwareness";
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
import PledgeCertificate from "./components/PledgeCertificate";
import UpdateAdmin from "./components/UpdateAdmin";

// =====================
// 👇 SCROLL TO TOP FIX
// =====================
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",   // change to "smooth" if you want animation
    });
  }, [pathname]);

  return null;
};
// =====================


const App: React.FC = () => {
  const navigate = useNavigate();

  const { checkAuth, user } = useLogin();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* 👇 THIS MAKES EVERY ROUTE START FROM TOP */}
      <ScrollToTop />

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
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/child-marriage-awareness"
            element={<ChildMarriageAwareness />}
          />
          <Route path="/card" element={<NgoIdCardDemo />} />
          <Route path="/donate" element={<DonationForm />} />
          <Route path="/pledge-certificate" element={<PledgeCertificate />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/donationPerson" replace /> : <LoginPage />}
          />
        </Route>

        {/* 🛠 Admin Dashboard */}
        <Route element={user ? <Layout /> : <LoginPage />}>
          <Route path="/donationPerson" element={<DonationPerson />} />
          <Route path="/registrationPerson" element={<RegistrationPerson />} />
          <Route path="/update-admin" element={<UpdateAdmin />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
