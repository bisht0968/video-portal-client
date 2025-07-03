import React from 'react';

import './PhotoCard.scss';

import videoCardImage1 from '../assets/Hero section.jpg';

const PhotoCard = ({ photo }) => {
    return (
        <div className="photoCardContainer">
            <div className="photoCardSection">
                <div className="photoCardImage">
                    <img src={videoCardImage1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default PhotoCard;
