import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.scss';
import { AppContext } from '../context/AuthContext.jsx';
import DashboardCard from '../components/DashboardCard.jsx';
import VideoCard from '../components/VideoCard.jsx';
import NoUserVideosComponent from '../components/NoUserVideosComponent.jsx';
import Spinner from '../components/Spinner';

import { useNavigate } from 'react-router-dom';
import UploadVideos from '../components/UploadVideos.jsx';

import baseUrl from '../api.js';

const Dashboard = () => {
    const { user, isAuthenticated, token, userVideos, getUserVideos, updateTotalViews } = useContext(AppContext);

    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showSuccessfullMessage, setShowSuccessfullMessage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUploadClick = () => setShowUploadModal(true);
    const handleCloseModal = () => {
        setShowUploadModal(false);
        setSelectedFile(null);
        setThumbnail(null);
        setTitle('');
        setDescription('');
    };

    const handleShowSuccessfullMessage = () => {
        setShowSuccessfullMessage(true);
        setTimeout(() => setShowSuccessfullMessage(false), 3000);
    };

    const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
    const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };
    const handleDragOver = (e) => e.preventDefault();

    const handleUpload = async () => {
        if (!selectedFile || !title || !description || !thumbnail) {
            alert("Please fill all fields and select both video and thumbnail files.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("video", selectedFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);

        try {
            const res = await fetch(`${baseUrl}/videos/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (res.ok) {
                handleCloseModal();
                handleShowSuccessfullMessage();
                setRefreshTrigger(prev => !prev);
            } else {
                const errorData = await res.json();
                console.error(errorData);
                alert("Upload failed: " + errorData.message);
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Upload error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserVideos();
        updateTotalViews();
    }, [refreshTrigger]);

    return (
        <>
            <div className="dashboardSection">
                <div className="dashboardContainer">
                    <div className="dashboardHeading">
                        <h1>Welcome back, {isAuthenticated && user?.username ? user.username : 'Creator'}!</h1>
                        <p>Here's what's happening with your channel</p>
                    </div>

                    <div className="dashboardNavbar">
                        <div className="dashboardSearch">
                            <form>
                                <input type="text" placeholder="Search..." />
                                <button type="submit">Search</button>
                            </form>
                        </div>
                        <div className="dashboardUpload">
                            <button onClick={handleUploadClick}>Upload</button>
                        </div>
                    </div>

                    <div className="dashboardCardConatainer">
                        <DashboardCard />
                    </div>

                    <div className="dashboardVideos">
                        <h2>Recent Videos</h2>
                        <div className="dashboardVideosContainer">
                            {userVideos.length > 0 ? userVideos.map((data) => (
                                <div className="dashboardVideoContainerSection" key={data._id} onClick={() => {
                                    navigate(`/videos/${data._id}`)
                                }}>
                                    <VideoCard video={data} />
                                </div>
                            )) : (
                                <NoUserVideosComponent handleUploadClick={handleUploadClick} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                loading ? (
                    <div className="uploadModalOverlay">
                        <Spinner text="Uploading Video" />
                    </div>
                ) : (
                    <UploadVideos handleCloseModal={handleCloseModal} title={title} setTitle={setTitle} description={description} setDescription={setDescription} handleDragOver={handleDragOver} handleDrop={handleDrop} handleFileChange={handleFileChange} handleThumbnailChange={handleThumbnailChange} handleUpload={handleUpload} selectedFile={selectedFile} thumbnail={thumbnail} />
                )
            )}

            {showSuccessfullMessage && (
                <div className="successMessageOverlay">
                    <div className="successMessage">
                        <h2>Video Uploaded Successfully!</h2>
                        <p>Your video is now being processed and will be available shortly.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
