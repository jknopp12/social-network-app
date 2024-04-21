import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../navigation';
import * as client from './client';
import './index.css';
import { CiBowlNoodles } from "react-icons/ci";

function Profile() {
    const [profile, setProfile] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 'USER'
    });
    const [recipes, setRecipes] = useState<client.Recipe[]>([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await client.signout();
        navigate('/Login');
    };

    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
            const userRecipes = await client.findRecipeByUser(account);
            setRecipes(userRecipes);
        } catch (error: any) {
            // If the error message is 'Unauthorized', redirect to the Login page
            if (error.message === 'Unauthorized') {
                navigate('/Profile/SignedOut');
            } else {
                console.error('Error fetching profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <button className="btn btn-primary btn-logout" onClick={handleLogout}>
                    Sign Out
                </button>
                <h1 className="mb-4">Profile</h1>
                <hr />
                <h2>Welcome, {profile.username}!</h2>
                <p className="mb-4">View and manage your profile information, photos, and posts.</p>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <Link to="/Profile/Information" className="btn btn-primary btn-block">
                            View Personal Information
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/Profile/Followers" className="btn btn-primary btn-block">
                            Followers
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/Profile/Following" className="btn btn-primary btn-block">
                            Following
                        </Link>
                    </div>
                </div>
                <hr />
                <Link to="/Profile/Post" className="btn btn-primary btn-logout">
                    Create a New Post
                </Link>
                <h2 className="mb-3"> Your Recipe Posts </h2>
                <p className="mb-4">View all of your posted recipes here! <br />
                    Click on a recipe card to view more details:</p>
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card">
                                <Link to={`/Recipe/${recipe._id}`} style={{ textDecoration: 'none' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.name}</h5>
                                        <p className="card-text">{recipe.description}</p>
                                        <CiBowlNoodles className="card-icon text-right position-absolute bottom-0 end-0" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
