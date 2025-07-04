import React from 'react'

import './UploadVideos.scss';

const UploadVideos = ({ handleCloseModal, title, setTitle, description, setDescription, handleDragOver, handleDrop, handleFileChange, handleThumbnailChange, handleUpload, selectedFile, thumbnail }) => {
    return (
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
    )
}

export default UploadVideos
