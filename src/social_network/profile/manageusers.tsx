import React, { useState, useEffect } from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import * as client from "./client";
import { User, updateUser } from "./client";
import Navigation from "../navigation";
import { Link, useNavigate } from "react-router-dom";
export default function ManageUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: ""
    });
    useEffect(() => {
        checkUserRole();
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
    const checkUserRole = async () => {
        try {
            const account = await client.profile();
            setUser(account);
            if (account.role !== "ADMIN") {
                navigate("/Profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const updateUserRole = async (updatedUser: User) => {
        try {
            await client.updateUser(updatedUser);
            // Update the local state to reflect the changed role
            setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
        const newRole = event.target.value;
        const updatedUser = users.find(u => u._id === userId);
        if (updatedUser) {
            const updatedUserData = { ...updatedUser, role: newRole };
            await updateUserRole(updatedUserData);
        }
    };

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <button className="btn btn-primary btn-logout" onClick={signout}>
                    Sign Out
                </button>
                <button className="btn btn-primary btn-logout" onClick={back}>
                    Back to Profile
                </button>
                <h1>Manage Users</h1>
                <hr />
                <h4>Hey, {user.username}!</h4>
                <p className="mb-4">Here you can view and manage all of the site's users.
                    <br /> You can edit any user's profile information, their role, and remove them from the site</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    {user.role}
                                    <select value={user.role} onChange={(event) => handleRoleChange(event, user._id)}>
                                        <option value="user">User</option>
                                        <option value="chef">Chef</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => updateUser(user)}>
                                        Update Role
                                    </button>
                                    <button className="btn btn-primary" onClick={() => deleteUser(user)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

