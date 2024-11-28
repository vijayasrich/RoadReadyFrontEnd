import React, { useEffect, useState } from "react";
import { getUsers } from "./Services/UserService";
import "./UserList.css"; // Make sure the path is correct

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log(data); // Log the data to check its structure
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>User List</h2>
      {error && <p>{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th> {/* Add Role column */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.userId}> {/* Use userId as the unique key */}
                <td>{user.userId}</td> {/* Access userId */}
                <td>{user.userName}</td> {/* Access userName */}
                <td>{user.email}</td> {/* Access email */}
                <td>{user.role}</td> {/* Access role */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td> {/* Adjust column span for the role */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

