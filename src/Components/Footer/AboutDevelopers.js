import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AboutDevelopers = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <h5 className="about-company-text-color margin-bottom-cancel">ABOUT DEVELOPERS: </h5>
            <a href="https://www.facebook.com/profile.php?id=100055908652292" target="_blank" className="about-company-text-color mx-2"><FacebookOutlinedIcon className="about-company-text-color"/></a>
            <a href="https://github.com/Rakib221" target="_blank" className="about-company-text-color"><GitHubIcon className="about-company-text-color"/></a>
            <a href="https://github.com/rakib221PS" target="_blank" className="about-company-text-color mx-2"><GitHubIcon className="about-company-text-color"/></a>
            <a href="https://www.linkedin.com/in/md-rakib-hasan-968055227/" target="_blank" className="about-company-text-color"><LinkedInIcon className="about-company-text-color"/></a>
            <a href="#" target="_blank" className="about-company-text-color mx-2"><AccountCircleIcon className="about-company-text-color"/></a>
        </div>
    );
};

export default AboutDevelopers;