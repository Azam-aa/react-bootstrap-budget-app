import React, { useEffect, useState } from 'react';
import Button from './Button';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    document.body.classList.toggle('bg-dark', darkMode);
    document.body.classList.toggle('text-white', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Button
      variant={darkMode ? 'light' : 'dark'}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;
