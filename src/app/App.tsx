import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { AboutIkamma } from './pages/AboutIkamma';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutIkamma />} />
    </Routes>
  );
}
