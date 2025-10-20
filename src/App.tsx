import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import OurMembers from './components/OurMembers';
import Skims from './components/Skims';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
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
            <Route path='/contact' element={<Contact />} />
            <Route path="/skims" element={<Skims />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;