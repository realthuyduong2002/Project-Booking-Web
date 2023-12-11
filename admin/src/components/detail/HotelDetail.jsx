// HotelDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HotelDetail = () => {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        const fetchHotelDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`);
                setHotel(response.data);
            } catch (error) {
                console.error("Error fetching hotel detail:", error);
            }
        };

        fetchHotelDetail();
    }, [hotelId]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{hotel.name}</h2>
            {/* Display other hotel details */}
        </div>
    );
};

export default HotelDetail;
