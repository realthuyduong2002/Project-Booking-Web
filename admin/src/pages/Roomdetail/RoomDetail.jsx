// RoomDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./roomdetail.scss"; // Import the stylesheet for RoomDetail

const RoomDetail = () => {
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/rooms/${roomId}`);
                setRoomData(response.data);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchData();
    }, [roomId]);

    return (
        <div className="new"> {/* Adjust the class name as needed */}
            <Sidebar />
            <div className="newContainer"> {/* Adjust the class name as needed */}
                <Navbar />
                <div className="top">
                    <h1>{roomData ? roomData.title : "Loading..."}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                roomData && roomData.photos && roomData.photos.length > 0
                                    ? roomData.photos[0]
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            {roomData && (
                                <>
                                    <div className="formInput">
                                        <label>Title</label>
                                        <p>{roomData.title}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Price</label>
                                        <p>${roomData.price}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Max People</label>
                                        <p>{roomData.maxPeople}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Description</label>
                                        <p>{roomData.desc}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Room Numbers</label>
                                        {roomData.roomNumbers.map((roomNumber, index) => (
                                            <div key={index}>
                                                <p>Room Number: {roomNumber.number}</p>
                                                {roomNumber.unavailableDates.length > 0 && (
                                                    <p>Unavailable Dates: {roomNumber.unavailableDates.join(', ')}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Add other fields similarly */}
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
