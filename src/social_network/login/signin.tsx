import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import "./index.css"

export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "", password: "", firstName: "", lastName: "", email: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <input className="input" value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })} />
      <br />
      <input className="input" value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })} />
      <br />
      <button className="btn button btn-primary" onClick={signin}> Sign In </button>
    </div>
  );
}