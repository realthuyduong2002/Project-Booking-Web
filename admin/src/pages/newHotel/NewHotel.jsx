import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});

  const { data, loading, error } = useFetch("http://localhost:8800/api/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    setRooms(e.target.value);
  };

  const renderValue = (selected) => {
    return selected.map((roomId) => {
      const room = data.find((room) => room._id === roomId);
      return room ? room.title : roomId;
    }).join(', ');
  };

  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    // Validate the form
    const validationErrors = validateForm(info);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dq2ucdguz/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("http://localhost:8800/api/hotels", newhotel);
    } catch (err) { console.log(err) }
  };
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Title is required!";
    }

    if (!formData.type) {
      errors.type = "Type is required!";
    }

    if (!formData.address) {
      errors.address = "Address is required!";
    }

    if (!formData.cheapestPrice) {
      errors.cheapestPrice = "Price is required!";
    } else if (isNaN(formData.cheapestPrice) || formData.cheapestPrice <= 0) {
      errors.cheapestPrice = "Price must be a valid positive number!";
    }

    if (!formData.name) {
      errors.name = "Name is required!";
    }

    if (!formData.city) {
      errors.city = "City is required!";
    }

    if (!formData.distance) {
      errors.distance = "Distance is required!";
    } else if (isNaN(formData.distance) || formData.distance < 0) {
      errors.distance = "Distance must be a valid non-negative number!";
    }

    if (!formData.desc) {
      errors.desc = "Description is required!";
    }

    setErrors(errors);
    return errors;
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                  {errors[input.id] && <p style={{ color: 'red' }}>{errors[input.id]}</p>}

                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <Select
                  id="rooms"
                  multiple
                  value={rooms}
                  onChange={handleSelect}
                  renderValue={renderValue}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.title}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;