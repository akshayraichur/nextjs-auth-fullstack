"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
  const token = useSearchParams().get("token");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  console.log(token);

  const verifyEmail = async () => {
    let response = await axios.post("/api/users/verifyemail", { token });
    console.log(response.data);
    if (response.data?.success) {
      setVerified(true);
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your email</h1>
      <h2>{token}</h2>
      {verified && <h2>Congratulations, your email is verified</h2>}
      {!verified && <h2>Email not verified</h2>}
    </div>
  );
}
