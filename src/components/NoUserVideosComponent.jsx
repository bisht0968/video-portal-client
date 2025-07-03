import React from 'react'

import "./NoUserVideosComponent.scss"

const NoUserVideosComponent = ({ handleUploadClick }) => {
    return (
        <div className="noUserVideosSection">
            <div className="noUserVideosContainer">
                <div className="noUserVideosText">
                    No Videos Uploaded!
                </div>
                <div className="noUserVideosUploadButton">
                    <div className="noUserVideosUploadButtonText">
                        Uplaod your First Video.
                    </div>
                    <button onClick={handleUploadClick}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoUserVideosComponent;
