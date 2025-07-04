import React from 'react';

import './PhotoCard.scss';

const PhotoCard = ({ photo }) => {
    return (
        <div className="photoCardContainer">
            <div className="photoCardSection">
                <div className="photoCardImage">
                    <img src={photo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default PhotoCard;
