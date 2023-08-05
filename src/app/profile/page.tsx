"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout done");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data.user);
    setData(response.data.user);
  };

  const forgotPassword = async () => {
    // shoot a mail, with password reset token
    const response = await axios.get("/api/users/forgotpassword");
    console.log(response.data);
    toast.success("Reset email has been sent");
  };
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <button onClick={logoutHandler} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
        Logout
      </button>

      <br />

      <button
        onClick={getUserDetails}
        className="rounded bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4"
      >
        Get data
      </button>

      <br />

      <button
        onClick={forgotPassword}
        className="rounded bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
      >
        Forgot password?
      </button>

      <div>{/* <h2>{data}</h2> */}</div>
    </div>
  );
}
