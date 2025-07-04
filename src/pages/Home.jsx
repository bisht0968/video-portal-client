import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import heroSectionImage from '../assets/Hero section.jpg'
import VideoCard from '../components/VideoCard';
import './Home.scss';
import PhotoCard from '../components/PhotoCard';
import { AppContext } from '../context/AuthContext';
import Spinner from '../components/Spinner';

import photo1 from '../assets/photo gallery1.jpg';
import photo2 from '../assets/photo gallery2.jpg';
import photo3 from '../assets/photo gallery3.jpg';

const Home = () => {

    const navigate = useNavigate();

    const { getAllVideos, allVideos, isAuthenticated } = useContext(AppContext);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            await getAllVideos();
            setLoading(false);
        };

        fetchVideos();
    }, []);


    return (
        <div className="homeContainer">
            <div className="homeSection">
                <div className="heroSection">
                    <div className="homeSectionDescription">
                        <h1>Welcome to Our <br />Video Platform</h1>
                        <p>Discover, watch, and share amazing videos from around the world.</p>
                        {!isAuthenticated && <button onClick={() => navigate('/register')}>Get Started</button>}
                    </div>
                    <div className="homeSectionImage">
                        <img src={heroSectionImage} alt="Hero" />
                    </div>
                </div>

                <div className="videoSection">
                    {loading ? (
                        <Spinner text="Loading Videos" />
                    ) : (
                        allVideos.slice(0, 3).map((video) => (
                            <div className="videoContainer" key={video._id}>
                                <VideoCard video={video} homePage={true} onClick={() => navigate(`/videos/${video._id}`)} />
                            </div>
                        ))
                    )}
                </div>

                <div className="photoSection">
                    <hr />
                    <h1 className="photoHeading">Explore Our Photo Gallery</h1>
                    <div className="photoContainer">
                        <PhotoCard photo={photo1} />
                        <PhotoCard photo={photo2} />
                        <PhotoCard photo={photo3} />
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
        </div>
    );
};

export default Home;