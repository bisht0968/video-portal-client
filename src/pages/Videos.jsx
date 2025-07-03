import React, { useEffect, useState } from 'react';

import { useContext } from 'react';
import { AppContext } from '../context/AuthContext';

import './Videos.scss';

import VideoCard from '../components/VideoCard';
import TrendingVideoCard from '../components/TrendingVideoCard';

import { useNavigate } from 'react-router-dom';

const Videos = () => {

    const navigate = useNavigate();

    const { allVideos, userVideos } = useContext(AppContext);

    const [localAllVideos, setLocalAllVideos] = useState([]);
    const [trendingVideos, settrendingVideos] = useState([]);

    const [index, setIndex] = useState(0);

    const handleLeftScroll = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(trendingVideos.length - 1);
        }
    };

    const handleRightScroll = () => {
        if (index < trendingVideos.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };


    useEffect(() => {
        const filteredVideos = allVideos.filter(
            (video) => !userVideos.some((userVideo) => userVideo._id === video._id)
        );
        setLocalAllVideos(filteredVideos);
        const filteredTrendingVideos = [...allVideos]
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
        settrendingVideos(filteredTrendingVideos);
        console.log(trendingVideos);
    }, [allVideos, userVideos]);

    return (
        <div className="videosSection">
            <div className="videosContainer">
                <div className="videosTrendingSection">
                    <h1>Trending Videos</h1>
                    <div className="videosTrendingScrollableSection">
                        <span className="leftScrollArrow" onClick={handleLeftScroll}>
                            {'<'}
                        </span>
                        <div className="trendingSlider">
                            <div
                                className="trendingSliderInner"
                                style={{ transform: `translateX(-${index * 100}%)` }}
                            >
                                {trendingVideos.map((item, i) => (
                                    <div className="trendingSlide" key={i}>
                                        <TrendingVideoCard video={item} onClick={() => {
                                            navigate(`/videos/${item._id}`)
                                        }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <span className="rightScrollArrow" onClick={handleRightScroll}>
                            {'>'}
                        </span>
                    </div>
                </div>

                <div className="videosAllVideosSection">
                    <div className="videoContainer">
                        {localAllVideos.length > 0 ? localAllVideos.map((video) => (
                            <VideoCard key={video._id} video={video} onClick={() => {
                                navigate(`/videos/${video._id}`)
                            }} />
                        )) : (
                            <p>No videos available</p>
                        )}
                    </div>
                </div>

                <div className="userVideosSection">
                    <h1>User Uploaded Videos</h1>
                    <div className="userVideosContainer">
                        {userVideos.length > 0 ? userVideos.map((video) => (
                            <VideoCard key={video._id} video={video} onClick={() => {
                                navigate(`/videos/${video._id}`)
                            }} />)) :
                            (
                                <p>No videos available</p>
                            )}
                    </div>
                </div>
            </div>

            <div className="videosFooter">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Videos;
