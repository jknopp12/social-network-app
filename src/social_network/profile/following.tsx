import React, { useState, useEffect } from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import * as client from "./client";
import { User } from "./client";
export default function Following() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "", email: ""
    });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
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

    useEffect(() => { fetchUsers(); }, []);

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
                <h1>Following</h1>
                <hr />
                <h4>Hey, {user.username}!</h4>
                <p className="mb-4">Here you can view and manage who you are following:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Unfollow</th>
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

