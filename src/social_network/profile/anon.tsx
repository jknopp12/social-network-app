import { useEffect, useState } from "react";
import { CiBowlNoodles } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { User } from "./client";
import * as client from "./client";

export default function Anon() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const allUsers = await client.findAllUsers();
        const limitedUsers = allUsers.slice(0, 5); // Displaying only first 5 users
        setUsers(limitedUsers);
    };

    const handleUserClick = (userId: string) => {
        navigate(`/Profile/${userId}`);
    };

    return (
        <div className="d-flex">
            <Navigation />
            <div className="content-container">
                <Link to="/Login" className="btn btn-primary btn-logout">
                    Sign Up
                </Link>
                <h1 className="mb-4">Profile</h1>
                <hr />
                <h2>Welcome!</h2>
                <p className="mb-4">If you want to join all of our amazing users, click the sign up button!
                <br/> Click on their usernames below to view their public profiles and recipe posts:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id} onClick={() => handleUserClick(user._id)} style={{cursor: 'pointer'}}>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
