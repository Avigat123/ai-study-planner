import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://ai-study-planner-iktk.onrender.com"; // change later for deploy

function Auth({ setToken }) { // receive setToken from App.jsx
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = async () => {
        try {
            const url = isLogin ? "/auth/login" : "/auth/signup";

            const res = await axios.post(`${BASE_URL}${url}`, {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token); //  works for BOTH login + signup

        } catch (err) {
            console.error(err);
            alert("Error occurred");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white"
            }}
        >
            <div
                style={{
                    width: "350px",
                    padding: "30px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(15px)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.5)"
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    {isLogin ? "Login" : "Signup"}
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleAuth} style={buttonStyle}>
                    {isLogin ? "Login" : "Signup"}
                </button>

                <p
                    onClick={() => setIsLogin(!isLogin)}
                    style={{
                        marginTop: "15px",
                        textAlign: "center",
                        cursor: "pointer",
                        color: "#cbd5f5"
                    }}
                >
                    {isLogin
                        ? "Don't have an account? Signup"
                        : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
};

const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

export default Auth;


