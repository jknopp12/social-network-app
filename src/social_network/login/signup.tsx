import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: ""
      });
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup({ ...user, role: profile.role });
            navigate("/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            {error && <div>{error}</div>}
            <input className="input" value={user.username} onChange={(e) => setUser({
                ...user, username: e.target.value
            })} />
            <br />
            <input type="password" className="input" value={user.password} onChange={(e) => setUser({
                ...user, password: e.target.value
            })} />
            <br />
            <select title="Role" className="input" onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="CHEF">Chef</option>
            </select>
            <br />
            <button className="btn button btn-primary" onClick={signup}> Sign Up </button>
        </div>
    );
}
