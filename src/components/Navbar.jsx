import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">My Website</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/aboutme" className="text-white">About Me</Link>
          <Link to="/services" className="text-white">Services</Link>
          <Link to="/contactus" className="text-white">Contact Us</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/aboutme" className="text-white">About Me</Link>
          <Link to="/services" className="text-white">Services</Link>
          <Link to="/contactus" className="text-white">Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
