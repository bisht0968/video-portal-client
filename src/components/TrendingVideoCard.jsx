import React from 'react'

import './TrendingVideoCard.scss';

const TrendingVideoCard = ({ video, onClick }) => {

    return (
        <div className='trendingVideoCardContainer' onClick={onClick}>
            <div className="trendingVideoCardSection">
                <div className="trendingVideoCardImage">
                    <img src={`http://localhost:5000/${video.thumbnailUrl}`} alt="" />
                </div>

            </div>
        </div>
    )
}

export default TrendingVideoCard
