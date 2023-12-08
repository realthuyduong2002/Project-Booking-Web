// Register.jsx
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", userData);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="email"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                />
                <button disabled={loading} onClick={handleRegister}>
                    Register
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Register;
