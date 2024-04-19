import Navigation from "../navigation";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"
import * as client from "./client";

function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const handleLogout = async () => {
        await client.signout();
        navigate("/Login");
    };
    useEffect(() => {
        fetchProfile();
    }, [])
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <h1 className="mb-4">Profile</h1>
                <hr />
                <button className="btn btn-danger btn-logout" onClick={handleLogout}>
                    Logout
                </button>
                <h4>Welcome, {profile.username}!</h4>
                <p className="mb-4">View and manage your profile information, photos, and posts.</p>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <Link to="/Profile/Information" className="btn btn-primary btn-block">
                            View Personal Information
                        </Link>
                        {/* <button className="btn btn-primary btn-block">View Personal Information</button> */}
                    </div>
                    <div className="col-md-4">
                        <Link to="/Profile/Followers" className="btn btn-primary btn-block">
                            Followers
                        </Link>
                        {/* <button className="btn btn-primary btn-block">Following</button> */}
                    </div>
                    <div className="col-md-4">
                        <Link to="/Profile/Following" className="btn btn-primary btn-block">
                            Following
                        </Link>
                        {/* <button className="btn btn-primary btn-block">Followers</button> */}
                    </div>
                </div>

                <h4 className="mb-3">Posted Recipes</h4>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <img src="/images/sample.jpg" className="card-img-top" alt="Sample" />
                            <div className="card-body">
                                <h5 className="card-title">Post Title</h5>
                                <p className="card-body">Post content goes here.</p>
                                {/* // add post id */}
                                <Link to="/Recipe" className="btn btn-primary">
                                    View Recipe
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
