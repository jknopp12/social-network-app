import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import Navigation from "../navigation";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkUserRole();
    fetchUsers();
    fetchUser();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await client.findAllUsers();
    setUsers(fetchedUsers);
  };

  const deleteUser = async (userToDelete: User) => {
    try {
      await client.deleteUser(userToDelete);
      setUsers(users.filter((u) => u._id !== userToDelete._id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    const account = await client.profile();
    setUser(account);
  };

  const signout = async () => {
    await client.signout();
    navigate("/LogIn");
  };

  const navigate = useNavigate();

  const back = () => {
    navigate("/Profile");
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

  const updateUser = async (updatedUser: User) => {
    try {
      await client.updateUser(updatedUser);
      setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    property: keyof User,
    userId: string
  ) => {
    const { value } = event.target;
    const updatedUsers = users.map((u) =>
      u._id === userId ? { ...u, [property]: value } : u
    );
    setUsers(updatedUsers);
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
        <h4>Hey, {user?.username}!</h4>
        <p className="mb-4">
          Here you can view and manage all of the site's users.
          <br /> You can edit any user's profile information, their role, and remove them from the site
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => handleInputChange(e, "username", user._id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.password}
                    onChange={(e) => handleInputChange(e, "password", user._id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => handleInputChange(e, "firstName", user._id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => handleInputChange(e, "lastName", user._id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, "email", user._id)}
                  />
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleInputChange(e, "role", user._id)}
                  >
                    <option value="USER">User</option>
                    <option value="CHEF">Chef</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-primary btn-margin" onClick={() => updateUser(user)}>
                    Update
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
