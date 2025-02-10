import React, { useEffect } from 'react';
import {useParam} from 'react-router-dom'

const UserDetails = () => {
    const {userId}=useParam()
    useEffect(() => {
        console.log(userId)

    }
    , [userId])
    return (
        <div>
            
        </div>
    );
};

export default UserDetails;