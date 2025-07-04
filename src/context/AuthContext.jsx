import axios from "axios";
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
    const [userVideos, setUserVideos] = useState([]);

    const [singleVideo, setSingleVideo] = useState(null);
    const [allVideos, setAllVideos] = useState([]);
    const [totalViews, setTotalViews] = useState(0);

    const loginUser = async (formData, navigate) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("isAuthenticated", "true");
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            console.error("User login error:", err);
        }
    };

    const registerUser = async (formData, navigate) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("isAuthenticated", "true");
            setToken(res.data.token);
            setUser(res.data.user);

            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (err) {
            console.error("User registration error:", err);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const getUserVideos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/videos/user/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUserVideos(res.data);
        } catch (err) {
            console.error("Error fetching user videos:", err);
            setUserVideos([]);
        }
    };

    const getSingleVideoUsingID = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
            setSingleVideo(res.data);
        } catch (err) {
            console.error("Error fetching video:", err);
        }
    };

    const getAllVideos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/videos/getAllVideos");
            setAllVideos(res.data);
        } catch (err) {
            console.error("Error fetching all videos:", err);
            setAllVideos([]);
        }
    };

    const updateTotalViews = () => {
        setTotalViews(userVideos.reduce((acc, video) => acc + video.views, 0));
    }

    return (
        <AppContext.Provider value={{
            user,
            token,
            loginUser,
            registerUser,
            logout,
            isAuthenticated,
            userVideos,
            getUserVideos,
            getSingleVideoUsingID,
            singleVideo,
            getAllVideos,
            allVideos,
            totalViews,
            updateTotalViews
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
