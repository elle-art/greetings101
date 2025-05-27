// Api function to fetch user profile picture 
// and a getter function for the picture object
"use client";
import { API_BASE_URL, PROFILE_IMGS_ENDPOINT, USER_PFP_ENDPOINT } from "../constants";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { Picture } from "@/types/User";

const useFetchPfp = (): { pfp: Picture | null; error: string | null } => {
    const { user } = useUser();
    const [pfp, setPfp] = useState<Picture | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPfp = async () => {
            if (!user) {
                setError("User not found");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}${USER_PFP_ENDPOINT}${user.pfp}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch profile picture");
                }
                const data = await response.json();
                setPfp(data);
            } catch (err) {
                console.error("Error fetching profile picture:", err);
                setError("Failed to load profile picture");
            }
        };

        fetchPfp();
    }, [user]);

    return { pfp, error };
};

export const useFetchPfpOptions = () => {
    const [pfpOptions, setPfpOptions] = useState<Picture[] | []>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPfpOptions = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}${PROFILE_IMGS_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await response.json();
                setPfpOptions(data);
            } catch (error) {
                console.error("Error fetching images:", error);
                setError("Failed to load profile images");
            }
        };
        fetchPfpOptions();
    }, []);
    return { pfpOptions, error };
};

export default useFetchPfp;