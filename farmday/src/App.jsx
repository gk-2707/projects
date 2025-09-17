import Header from './components/Header';
import Home from './sections/Home';
import About from './sections/About';
import Features from './sections/Features';
import Reviews from './sections/Reviews';
import Blogs from './sections/Blogs';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#1a1f32] text-white">
      <Header />
      <main className="pt-[60px]">
        <Home />
        <About />
        <Features />
        <Reviews />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
