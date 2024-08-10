import React, { useState } from 'react';
import SearchInput from './SearchInput';

interface NavbarProps {
  onSearchChange: (term: string) => void;
}

const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#003366] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="text-white text-lg font-bold mb-2 md:mb-0">
          <a href="#" className="hover:text-blue-300">Let's Watch Together</a>
        </div>

        {/* Search Input and Mobile Menu Button */}
        <div className="flex items-center w-full md:w-auto">
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
          <button
            className="text-white text-2xl md:hidden ml-4"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={` mt-11 lg:mt-0 fixed top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:flex md:items-center md:space-x-4`}
          style={{ zIndex: 100 }}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <li>
              <a href="#" className="text-white hover:text-blue-300 block py-2 px-4 md:py-0">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-300 block py-2 px-4 md:py-0">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-300 block py-2 px-4 md:py-0">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-blue-300 block py-2 px-4 md:py-0">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
