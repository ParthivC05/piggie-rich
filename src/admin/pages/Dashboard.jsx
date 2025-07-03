import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const [usersRes, depositsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/deposits`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const usersData = await usersRes.json();
        const depositsData = await depositsRes.json();
        setUsers(usersData.users || []);
        setDeposits(depositsData.deposits || []);
      } catch (err) {
        
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <table className="mb-8 w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-2 py-1">{u.username}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-semibold mb-2">Deposits</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Game</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((d) => (
            <tr key={d._id}>
              <td className="border px-2 py-1">{d.userId?.username}</td>
              <td className="border px-2 py-1">{d.userId?.email}</td>
              <td className="border px-2 py-1">{d.game}</td>
              <td className="border px-2 py-1">${d.amount}</td>
              <td className="border px-2 py-1">{new Date(d.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;