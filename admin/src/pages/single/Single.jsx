// ... (import statements)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Single = () => {
  const { hotelId } = useParams();
  const [entityData, setEntityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`);
        setEntityData(response.data);
      } catch (error) {
        console.error("Error fetching entity details:", error);
      }
    };

    fetchData();
  }, [hotelId]);

  const renderEntityDetails = () => {
    if (!entityData) {
      return <div>Loading...</div>;
    }

    // Render details based on entityData for hotels
    return (
      <div className="hotelDetails">
        <h2>{entityData.name}</h2>
        <p>Type: {entityData.type}</p>
        <p>City: {entityData.city}</p>
        <p>Address: {entityData.address}</p>
        <p>Distance: {entityData.distance} miles</p>
        <p>Rating: {entityData.rating}/5</p>
        <p>Rooms: {entityData.rooms}</p>
        <p>Cheapest Price: ${entityData.cheapestPrice}</p>
        <p>Featured: {entityData.featured ? "Yes" : "No"}</p>
        {/* Render other hotel details using entityData */}
      </div>
    );
  };

  return (
    <div>
      {renderEntityDetails()}
      {/* ... rest of your component logic */}
    </div>
  );
};

export default Single;
