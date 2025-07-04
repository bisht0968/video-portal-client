import React, { useEffect, useRef, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AuthContext';

import './SingleVideo.scss';
import Spinner from '../components/Spinner';

const SingleVideo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);

    const { getSingleVideoUsingID, singleVideo } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSingleVideoUsingID(id);
    }, [id]);

    const handleWaiting = () => setLoading(true);
    const handlePlaying = () => setLoading(false);

    return (
        <div className="singleVideoPage">
            <button className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </button>

            {singleVideo?.videoUrl ? (
                <div className="videoWrapper">
                    <video
                        ref={videoRef}
                        src={singleVideo.videoUrl}
                        poster={singleVideo.thumbnailUrl}
                        controls
                        autoPlay
                        disablePictureInPicture
                        onWaiting={handleWaiting}
                        onPlaying={handlePlaying}
                        preload="auto"
                    />
                    {loading && (
                        <div className="videoSpinnerOverlay">
                            <Spinner text="Loading Video" />
                        </div>
                    )}

                    <div className="videoDetails">
                        <div className="videoDetailsContainer">
                            <h1 className="videoTitle">{singleVideo.title}</h1>
                            <div className="videoMeta">
                                <span>{singleVideo.views} views</span>
                                <span>•</span>
                                <span>{new Date(singleVideo.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Uploaded by: {singleVideo.uploadedBy?.username || 'Unknown'}</span>
                            </div>
                        </div>
                        <p className="videoDescription">{singleVideo.description}</p>
                    </div>
                </div>
            ) : (
                <div className="videoLoadingInfo">
                    <Spinner text="Loading Video" />
                    <p>Loading video...</p>
                </div>
            )}
        </div>
    );
};

export default SingleVideo;
