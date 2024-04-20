import "./index.css"
import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation";

export default function Information() {
  const [profile, setProfile] = useState({
    _id: "", username: "", password: "",
    firstName: "", lastName: "", email: "", role: ""
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Login");
  };
  const back = async () => {
    navigate("/Profile");
  };
  useEffect(() => {
    fetchProfile();
  }, [])

  return (
    <div className="d-flex">
      <Navigation />
      <div style={{ flexGrow: 1, padding: "20px" }}>
      <button className="btn button btn-primary btn-logout" onClick={signout}>
          Sign Out
        </button>
        <h1 className="mb-4" > Profile Information</h1>
        <hr />
        <h4>Hey, {profile.username}!</h4>
        <p className="mb-4">Here you can view and manage your profile information:</p>
        {profile && (
          <div>
            <input placeholder="Username" className="input" title="Username" value={profile.username} onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })} />
            <br />
            <input placeholder="Password" className="input" title="Password" value={profile.password} onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })} />
            <br />
            <input placeholder="First Name" className="input" title="First Name" value={profile.firstName} onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })} />
            <br />
            <input placeholder="Last Name" className="input" title="Last Name" value={profile.lastName} onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })} />
            <br />
            <input placeholder="Email" className="input" title="Email" value={profile.email} onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })} />
            <br />
            <select title="Role" className="input" value={profile.role} onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="CHEF">Chef</option>
            </select>
            <br />
            <button className="btn button btn-primary" onClick={save}>
              Save Edits
            </button>
            <br />
            <button className="btn button btn-back" onClick={back} >
              Back to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
