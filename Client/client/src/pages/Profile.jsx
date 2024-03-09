import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; 

function UserProfile() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axios.get('/profile');
                setUserData(response.data); 
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }

        fetchUserProfile();
    }, []);

    return (
        <div className='container' style={{ paddingTop: "100px"}}>
            <h2>User Profile</h2>
            <div className='card col-3 m-2 p-4'>
                <img width={250} className="" src={userData.imageProfile} alt="Profile" />
                <h3>{userData.name} {userData.lastName}</h3>
                <h4>{userData.username}</h4>
                <p>Email: {userData.email}</p>
                <p>Address: {userData.address}, {userData.city}</p>
                <p>Phone Number: {userData.phoneNumber}</p>
            </div>
        </div>
    );
}

export default UserProfile;
