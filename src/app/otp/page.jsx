"use client";
import React, { useState } from "react";
import style from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(2);
  const [message, setMessage] = useState("");
  const path = useRouter();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/reset/verifyotp", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ otp }),
    });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) {
      alert("cnfirm");
      path.push(data.resetLink);
      //   setStep(3);
    } else {
      alert("failed");
    }
  };

  //   const handlePasswordReset = async (e) => {
  //     e.preventDefault();
  //     const response = await fetch(`http://localhost:3001/reset/verifyotp`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, newPassword }),
  //     });
  //     const data = await response.json();
  //     setMessage(data.message);
  //     if (response.ok) {
  //     }
  //   };

  return (
    <section className={style.form}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.con}>
          <h2>Password Reset</h2>
          {message && <p>{message}</p>}

          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button onClick={handleOtpSubmit} className={style.otpBtn}>
            Confirm OTP
          </button>

          <div className={style.exist}>
            <p className={style.click}>
              Didn&#39;t receive the email?{" "}
              <Link href={"/forgotpassword"}>Click to resend</Link>
            </p>
            <p>
              Go back to <Link href={"/signin"}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
