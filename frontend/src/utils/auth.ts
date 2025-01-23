import axios from "axios";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get("http://127.0.0.1:5000/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
