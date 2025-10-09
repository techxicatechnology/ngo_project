import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Causes } from './components/Causes';
import { Impact } from './components/Impact';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Causes />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
