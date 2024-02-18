import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './home.css';
export const   Home =() => {

    const navigate = useNavigate();

    const navigateToRegistrations = () => {
      navigate('/registrations');
    };
  return (
    <div id="home">
        <div className="home-up-part">
            <div className="title">
                <h1>Get Started Right Now !</h1>
            </div>
        </div>
        <div className="home-down-part">
            <img className="moving-image" src="astraunot.png" alt="" />
            <div className="button-div">
                <button className="click-here" onClick={navigateToRegistrations}><p style={{paddingRight:'20px'}}>Click Here!</p><FontAwesomeIcon icon={faArrowRight} /></button>
              
            </div>            
        </div>
    </div>
  );
}
export default Home;