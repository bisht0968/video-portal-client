import React, { useEffect } from 'react'

import { useContext } from 'react';

import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AuthContext';

import './SingleVideo.scss';

const SingleVideo = () => {

    const { id } = useParams()

    const { getSingleVideo, singleVideo } = useContext(AppContext)

    useEffect(() => {
        getSingleVideo(id);
    }, [id])

    console.log(singleVideo);
    return (
        <div>

            Single Video:single
        </div>
    )
}

export default SingleVideo
