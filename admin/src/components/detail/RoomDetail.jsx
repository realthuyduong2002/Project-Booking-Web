// RoomDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoomDetail = () => {
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const fetchRoomDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/rooms/${roomId}`);
                setRoomData(response.data);
            } catch (error) {
                console.error("Error fetching room detail:", error);
            }
        };

        fetchRoomDetail();
    }, [roomId]);

    const renderRoomDetails = () => {
        if (!roomData) {
            return <div>Loading...</div>;
        }

        // Render details based on roomData
        return (
            <div className="roomDetails">
                <h2>{roomData.title}</h2>
                <p>Price: ${roomData.price}</p>
                <p>Max People: {roomData.maxPeople}</p>
                <p>Description: {roomData.desc}</p>
                {/* Render other room details using roomData */}
            </div>
        );
    };

    return <div>{renderRoomDetails()}</div>;
};

export default RoomDetail;
