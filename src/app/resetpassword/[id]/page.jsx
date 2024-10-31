"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "../page.module.css";
import Link from "next/link";

function Page({ params }) {
  const router = useRouter();
  const token = params.id;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newPassword, confirmPassword);

    if (!token) {
      console.error("Token is missing or undefined.");
      alert("Invalid token. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/reset/resetpassword/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();
      
      if (response.ok) {
        alert("Success");
        router.push("/login");
      }

      setMessage(data.message || "Password reset successful.");
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>Reset Password</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          className={style.inputContainer}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New password"
          value={confirmPassword}
          className={style.inputContainer}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className={style.submitButton}>
          Reset Password
        </button>
      </form>
      {message && <p className={style.message}>{message}</p>}
      <p className={style.back}>
        {" "}
        Back to <Link href={"/otp"}>otp</Link>{" "}
      </p>
    </div>
  );
}

export default Page;
