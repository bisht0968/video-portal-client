import React from 'react';

import './VideoCard.scss';

const VideoCard = ({ key, video, homePage, onClick }) => {

    const truncateChars = (text, limit) => {
        return text.length > limit ? text.slice(0, limit) + '...' : text;
    };

    return (
        <div className="videoCardContainer" onClick={onClick}>
            <div className="videoCardSection">
                <div className="videoCardImage">
                    <img src={video.thumbnailUrl} alt="" />
                </div>
                {!homePage && (
                    <>
                        <div className="videoCardTitle">
                            {truncateChars(video.title, 40)}
                        </div>
                        <div className="videoCardDescription">
                            {truncateChars(video.description, 40)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
