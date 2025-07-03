import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.scss';
import { AppContext } from '../context/AuthContext.jsx';
import DashboardCard from '../components/DashboardCard.jsx';
import VideoCard from '../components/VideoCard.jsx';
import NoUserVideosComponent from '../components/NoUserVideosComponent.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, isAuthenticated, token, userVideos, getUserVideos } = useContext(AppContext);

    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showSuccessfullMessage, setShowSuccessfullMessage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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

        const formData = new FormData();
        formData.append("video", selectedFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);

        try {
            const res = await fetch("http://localhost:5000/api/videos/upload", {
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
        }
    };

    useEffect(() => {
        getUserVideos();
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
                <div className="uploadModalOverlay">
                    <div className="uploadModal">
                        <div className="uploadModalNavbar">
                            <h2>Upload Video</h2>
                            <button className="closeModalBtn" onClick={handleCloseModal}>X</button>
                        </div>
                        <div className="uploadOptions">
                            <input
                                type="text"
                                placeholder="Enter video title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div
                                className="dragDropArea"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <p>Drag and drop your video here</p>
                                {selectedFile && <p>Selected: {selectedFile.name}</p>}
                            </div>

                            <div className="orText">OR</div>
                            <input type="file" accept="video/*" onChange={handleFileChange} />

                            <div className="thumbnailInput">
                                <label>Select Thumbnail:</label>
                                <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                                {thumbnail && <p>Selected Thumbnail: {thumbnail.name}</p>}
                            </div>

                            <div className="uploadInstructions">
                                <p>Supported video formats: MP4, AVI, MOV</p>
                                <p>Supported image formats: JPG, PNG, JPEG</p>
                            </div>

                            <button className="uploadButton" onClick={handleUpload}>
                                Upload Video
                            </button>
                        </div>
                    </div>
                </div>
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
