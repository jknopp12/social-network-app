import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../navigation';
import * as client from './client';
import './index.css';
import { CiBowlNoodles } from "react-icons/ci";

const api = axios.create({
    withCredentials: true
});

export default function ProfileId() {
    const { profileId } = useParams<{ profileId: string }>();
    const [user, setUser] = useState<client.User>({
        _id: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        role: ''
    });
    const [recipes, setRecipes] = useState<client.Recipe[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const account = await client.findUserById(profileId ?? '');
                setUser(account);
                const userRecipes = await client.findRecipeByUser(account);
                setRecipes(userRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [profileId]);

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h1>Profile </h1>
                <hr />
                <h2 className="mt-4"> {user?.username} </h2>
                <p className="mb-4">Here you can view {user?.firstName} {user?.lastName}'s profile.</p>
                <hr />
                <h2 className="mt-4"> Posted Recipes </h2>
                <p className="mb-4">View the recipes that {user?.username} has posted:
                    <br />
                    Click on a recipe card to view more details:</p>
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card">
                                <Link to={`/Recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
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
