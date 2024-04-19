import "./index.css"
import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation";
export default function Information() {
  const [profile, setProfile] = useState({
    username: "", password: "",
    firstName: "", lastName: "", dob: "", email: "", role: "USER"
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
  useEffect(() => {
    fetchProfile();
  }, [])

  return (
    <div className="d-flex">
      <Navigation />
      <div style={{ flexGrow: 1, padding: "20px" }}>

        <h1 className="mb-4" > Profile Information</h1>
        <hr/>
        <h4>Hey, {profile.username}!</h4>
        <p className="mb-4">Here you can view and manage your profile information:</p>
        {profile && (
          <div>
            <input className="input" title="Username" value={profile.username} onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })} />
            <br />
            <input className="input" title="Password" value={profile.password} onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })} />
            <br />
            <input className="input" title="First Name" value={profile.firstName} onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })} />
            <br />
            <input className="input" title="Last Name" value={profile.lastName} onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })} />
            <br />
            <input className="input" title="Email" value={profile.email} onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })} />
            <br />
            <select title="Role" className="input" onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="CHEF">Chef</option>
            </select>
            <br />
            <button className="btn button btn-primary" onClick={save}>
              Save Edits
            </button>

            <button className="btn button btn-primary" onClick={signout}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
