import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Signup Date: {new Date(user.signup_date).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
