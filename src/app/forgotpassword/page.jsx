"use client";
import React, { useState } from 'react';
import style from './page.module.css';
import Link from "next/link";

function Page() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/reset/forgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if(response.ok) {
                console.log(data.otpCode);
                setMessage(data.message || "Check your email for the reset link.");
            } else {
                setMessage(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <section className={style.form}>
            <div className={style.left}></div>
            <div className={style.right}>
                <div className={style.con}>
                    <h2>Forgot password</h2>
                    <p>No worries. We&#39;ll send you a reset instruction.</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <button>Reset password</button>
                    </form>
                    {message && <p>{message}</p>}
                    <div className={style.exist}>
                        {/* <p>Go back<Link href={"/login"}>Login</Link></p> */}
                        <p> Go to <Link href={"/otp"}>otp</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;
