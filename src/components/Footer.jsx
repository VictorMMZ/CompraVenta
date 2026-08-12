import { useState, useEffect } from 'react';
import '../assets/css/footer.css';


export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');
  const userType = localStorage.getItem('userType') || 'empleado';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <span>{currentTime}</span>
      <span>Usuario:  </span>
      <span style={{ textTransform: 'capitalize' }}>{userType}</span>
    </footer>
  );
}
