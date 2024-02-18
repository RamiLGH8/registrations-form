import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader'; // Correct the import statement
import './registrations.css';

export const Registrations = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigateToHome = () => {
    navigate('/');
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name,
      email,
      phone,
      birth,
    };

    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log('ERROR');
        alert(result.message);
      } else {
        setName('');
        setEmail('');
        setPhone('');
        setBirth('');
        console.log('new user added', result);
       
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigate('/qrGenerator', { state: { email } });
        console.log('navigating to qrGenerator');
      }, 3000);
    }
  }, [name, email, phone, birth, navigate]);

  return (
    <div id="registrations">
      {isLoading ? (
          <HashLoader color={'#123abc'} loading={isLoading} size={150} />
        ) : 
      <div className="register">
        <h1>Profile info</h1>
        <p>Fill in the data for the profile. It will take a couple of minutes.</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Personal data</h2>
          <p>Specify exactly your info</p>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="phone-birth">
            <div className="form-phone-birth">
              <label htmlFor="phone">Phone</label>
              <input type="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-phone-birth">
              <label htmlFor="birth">Birth</label>
              <input type="date" id="birth" value={birth} onChange={(e) => setBirth(e.target.value)} />
            </div>
          </div>
          <div className="form-buttons">
            <button className="submit" onClick={navigateToHome}>
              <FontAwesomeIcon icon={faArrowLeft} /> Go Back
            </button>
            <button type="submit" className="submit">
              Submit <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </form>
      </div>}
      {isLoading ? (
          ''
        ) : 
      <div className="register-photo">
       
          <img className="moving-image" src="Meditation.png" alt="" />
       
      </div>}
    </div>
  );
};

export default Registrations;
