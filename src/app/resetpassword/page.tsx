"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const resetPassword = async () => {
    if (password.password !== password.confirmPassword) {
      toast.error("re-check your password");
      return;
    }
    let response = await axios.post("/api/users/forgotpassword", { token, password: password.password });
    console.log(response.data);

    if (response.data?.success) {
      setVerified(true);
      toast.success("password reset successful");
      router.push("/profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your email</h1>

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="password"
        value={password.password}
        onChange={(e) => setPassword({ ...password, password: e.target.value })}
        placeholder="password"
      />

      <br />

      <label htmlFor="confirm-password">confirm password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="confirm-password"
        value={password.confirmPassword}
        onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
        placeholder="confirm password"
      />

      <button
        onClick={resetPassword}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Reset
      </button>
    </div>
  );
}
