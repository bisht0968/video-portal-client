import React, { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import heroSectionImage from '../assets/Hero section.jpg'
import VideoCard from '../components/VideoCard';
import './Home.scss';
import PhotoCard from '../components/PhotoCard';
import { AppContext } from '../context/AuthContext';

const Home = () => {

    const navigate = useNavigate();

    const { getAllVideos, allVideos } = useContext(AppContext);

    useEffect(() => {
        getAllVideos();
    }, [])

    return (
        <div className="homeContainer">
            <div className="homeSection">
                <div className="heroSection">
                    <div className="homeSectionDescription">
                        <h1>Welcome to Our <br></br>Video Platform</h1>
                        <p>Discover, watch, and share amazing videos from around the world.</p>
                        <button onClick={() => {
                            navigate('/register')
                        }}>Get Started</button>
                    </div>
                    <div className="homeSectionImage">
                        <img src={heroSectionImage} alt="" />
                    </div>
                </div>
                <div className="videoSection">
                    {allVideos.slice(0, 3).map((video) => (
                        <div className="videoContainer">
                            <VideoCard key={video._id} video={video} homePage={true} />
                        </div>
                    ))}
                </div>
                <div className="photoSection">
                    <hr />
                    <h1 className="photoHeading">
                        Explore Our Photo Gallery
                    </h1>
                    <div className="photoContainer">
                        <PhotoCard photo="a" />
                        <PhotoCard photo="a" />
                        <PhotoCard photo="a" />
                    </div>
                </div>
                <div className="subscribeSection">
                    <div className="subscribeContainer">
                        <h1>Stay Updated</h1>
                        <p>Subscribe to our newsletter for the latest updates and exclusive content.</p>
                        <form>
                            <input type="email" placeholder="Enter your email" required />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="homeFooter">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
        </div >
    )
}

export default Home
