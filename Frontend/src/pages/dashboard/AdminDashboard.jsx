import React, { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import customReactQuery from '../../utils/useCustomReactQuery';
import { UserCard } from '../../components';

function AdminDashboard() {
    const fetchAllUsers = useCallback(() => databaseService.fetchAllUsers(), []);
    const { data, loading, error, refetch } = customReactQuery(fetchAllUsers);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-lg font-semibold">Loading...</div>;
    }
    if (error) {
        return <div className="text-red-500 text-center text-lg font-semibold">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {users && users.map((user) => (
                    <div key={user._id} className="flex justify-center">
                        <UserCard user={user} className="w-full max-w-xs shadow-lg rounded-lg overflow-hidden bg-white p-4" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
