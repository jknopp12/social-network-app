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
                <h3 className="mt-4"> Welcome to {user?.username}'s Profile! </h3>
                <p className="mb-4">Here you can view the recipes that {user?.username} has posted.</p>
                <h4 className="mt-4"> {user?.firstName}'s Recipes: </h4>
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card">
                                <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none' }}>
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
