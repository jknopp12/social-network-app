import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";
import Navigation from "../navigation";
export default function Followers() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER"
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
    const username = "JohnDoe";

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <h1>Followers</h1>
                <hr/>
                <h4>Hey, {username}!</h4>
                <p className="mb-4">Here you can view and manage who is following you:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username & Password</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                        </tr>
                        <tr>
                            <td>
                                <input className="table-input" value={user.username} onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })} />
                                <input className="table-input" value={user.password} onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })} />
                            </td>
                            <td>
                                <input className="table-input" value={user.firstName} onChange={(e) =>
                                    setUser({ ...user, firstName: e.target.value })} />
                            </td>
                            <td>
                                <input className="table-input" value={user.lastName} onChange={(e) =>
                                    setUser({ ...user, lastName: e.target.value })} />
                            </td>
                            <td>
                                <select className="table-input" value={user.role} onChange={(e) =>
                                    setUser({ ...user, role: e.target.value })}>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="STUDENT">Student</option>
                                </select>
                            </td>
                            <td>
                                <BsPlusCircleFill size={25} color="green" onClick={createUser} />
                            </td>
                            <th>&nbsp;</th>
                        </tr>

                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn" onClick={() => deleteUser(user)}>
                                        <BsTrash3Fill color="red" />
                                    </button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

