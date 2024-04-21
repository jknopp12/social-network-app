import React, { useState, useEffect } from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import * as client from "./client";
import { User } from "./client";
import Navigation from "../navigation";
import { Link, useNavigate } from "react-router-dom";
export default function Followers() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "", email: "",
        lastName: "", role: ""
    });
    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])
    const fetchUser = async () => {
        const account = await client.profile();
        setUser(account);
    };

    const signout = async () => {
        await client.signout();
        navigate("/LogIn");
    };
    const navigate = useNavigate();
    const back = async () => {
        navigate("/Profile");
    };
    const handleUserClick = (userId: string) => {
        navigate(`/Profile/${userId}`);
    };

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <button className="btn btn-primary btn-logout" onClick={signout}>
                    Sign Out
                </button>
                <button className="btn btn-primary btn-logout" onClick={back} >
                    Back to Profile
                </button>
                <h1>Followers</h1>
                <hr />
                <h4>Hey, {user.username}!</h4>
                <p className="mb-4">Here you can view and manage who is following you.
                <br/> Click a user to view their profile and recipe posts.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id} onClick={() => handleUserClick(user._id)} style={{ cursor: 'pointer' }}>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    <button className="btn" onClick={() => deleteUser(user)}>
                                        <RiUserUnfollowLine color="red" />
                                    </button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

