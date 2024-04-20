import Navigation from "../navigation";
import axios from "axios";
import { HiMiniBars3 } from "react-icons/hi2";
import { findUserById, User } from "./client";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const api = axios.create({
    withCredentials: true
}
);

export default function ProfileId() {
    const { profileId } = useParams();
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const account = await findUserById(profileId ?? '');
                setUser(account);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [profileId]);




    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <h2> Welcome to {user?.username}'s Profile </h2>
                <hr className="hline" />
            </div>
        </div>
    );
}