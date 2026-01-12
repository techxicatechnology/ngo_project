import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import OurMembers from './components/OurMembers';
import Skims from './components/Skims';
import Certificates from './components/Cerificates';
import RegistrationForm from './components/RegistrationForm';
import NgoIdCardDemo from './components/NgoIdCardDemo';
import DonationForm from "./components/DonationForm"
import { Toaster } from "react-hot-toast";
import NgoIdCard from './components/NgoIdCard';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>


      <Header />
      <main>
        <Routes>
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
          <Route path="/certificates" element={<Certificates/>} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/card" element={<NgoIdCardDemo />} />
          <Route path="/donate" element={<DonationForm />} />
        </Routes> 
      </main>
      <Footer />
    </div>
  );
}

export default App;
