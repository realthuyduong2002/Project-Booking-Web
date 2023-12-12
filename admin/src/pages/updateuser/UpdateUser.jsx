import React, { useState, useEffect } from "react";
import "./updateuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUser = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState(null);
    const { userId } = useParams();

    // Fetch user data based on userId when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [userId]);;
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        try {
            // Check if a new file is selected for upload
            if (file) {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dq2ucdguz/image/upload",
                    data
                );

                const { url } = uploadRes.data;

                // Update user data with the new image URL
                setInfo((prev) => ({ ...prev, img: url }));
            }

            // Perform the user update
            await axios.put(`http://localhost:8800/api/users/${userId}`, info);

            // Successful update
            setSuccessMessage("Updated successfully");
            setErrorMessage("");
        } catch (err) {
            console.error("Error:", err);
            setErrorMessage("Error updating user");
            setSuccessMessage("");
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{userData ? userData.username : "Loading..."}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                info.img
                                    ? info.img
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>

                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {userData &&
                                inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                            value={info[input.id] || ""}
                                        />
                                        {/* Display existing value for updates, except for password */}
                                        {input.id !== 'password' && (
                                            <div>Existing Value: {userData[input.id]}</div>
                                        )}
                                    </div>
                                ))}
                            <button onClick={handleClick}>Update</button>

                            {successMessage && (
                                <p style={{ color: "green" }}>{successMessage}</p>
                            )}
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;