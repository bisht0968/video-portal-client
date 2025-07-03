import React from 'react';

import './VideoCard.scss';

const VideoCard = ({ key, video, homePage, onClick }) => {
    console.log(video);
    return (
        <div className="videoCardContainer" onClick={onClick}>
            <div className="videoCardSection">
                <div className="videoCardImage">
                    <img src={`http://localhost:5000/${video.thumbnailUrl}`} alt="" />
                </div>
                {!homePage && (
                    <>
                        <div className="videoCardTitle">
                            {video.title}
                        </div>
                        <div className="videoCardDescription">
                            {video.description}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
