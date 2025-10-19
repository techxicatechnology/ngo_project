import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Causes } from './components/Causes';
import { Impact } from './components/Impact';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import OurMembers from './components/OurMembers';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
         <Gallery/>
        <Causes />
        <OurMembers/>
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
