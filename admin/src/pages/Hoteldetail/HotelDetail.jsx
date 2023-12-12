import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./hoteldetail.scss"; // Import the stylesheet for HotelDetail
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const HotelDetail = () => {
    const { hotelId } = useParams();
    const [entityData, setEntityData] = useState(null);
    const [roomNames, setRoomNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`);
                setEntityData(response.data);

                // Fetch room names based on room IDs
                const roomPromises = response.data.rooms.map(async (roomId) => {
                    const roomResponse = await axios.get(`http://localhost:8800/api/rooms/${roomId}`);
                    return roomResponse.data.title;
                });

                const roomNames = await Promise.all(roomPromises);
                setRoomNames(roomNames);
            } catch (error) {
                console.error("Error fetching entity details:", error);
            }
        };

        fetchData();
    }, [hotelId]);

    return (
        <div className="new"> {/* You can adjust the class name as needed */}
            <Sidebar />
            <div className="newContainer"> {/* You can adjust the class name as needed */}
                <Navbar />
                <div className="top">
                    <h1>{entityData ? entityData.name : "Loading..."}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                entityData && entityData.photos && entityData.photos.length > 0
                                    ? entityData.photos[0]
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            {entityData && (
                                <>
                                    <div className="formInput">
                                        <label>Type</label>
                                        <p>{entityData.type}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>City</label>
                                        <p>{entityData.city}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Address</label>
                                        <p>{entityData.address}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Distance</label>
                                        <p>{entityData.distance} miles</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Rating</label>
                                        <p>{entityData.rating}/5</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Rooms</label>
                                        <p>{roomNames.join(', ')}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Cheapest Price</label>
                                        <p>${entityData.cheapestPrice}</p>
                                    </div>
                                    <div className="formInput">
                                        <label>Featured</label>
                                        <p>{entityData.featured ? "Yes" : "No"}</p>
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

export default HotelDetail;
