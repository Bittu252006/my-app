import './App.css';
import AuthForm from './AuthForm';
import Dashboard from './Dashboard';
import About from './About';
import Contact from './Contact';
import Layout from './Layout';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<AuthForm />} />

      {/* ✅ Protected Layout with Navbar */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
