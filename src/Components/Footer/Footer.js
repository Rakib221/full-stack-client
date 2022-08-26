import React from 'react';
import AboutCompany from './AboutCompany';
import AboutDevelopers from './AboutDevelopers';
import Article from './Article';
import CopyRight from './CopyRight';
import LeaveComment from './LeaveComment';

const Footer = () => {
    return (
        <div className="bg-dark">
            <hr className="mt-5"/>
            <div className="row mt-5 justify-content-center align-items-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-3">
                    <LeaveComment></LeaveComment>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-3">
                    <Article></Article>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-3">
                    <AboutCompany></AboutCompany>
                </div>
                <div className="col-lg-1"></div>
            </div>
            <hr className="hr-color" />
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <AboutDevelopers></AboutDevelopers>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <hr className="hr-color" />
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <CopyRight></CopyRight> 
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    );
};

export default Footer;