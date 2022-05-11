import React from "react";

export default function VerifyEmail() {
  return (
    <div>
      <h2>Verify Email</h2>
      <p>
        An email has been sent to your email address. Please click the link to
        verify your account.
      </p>
      <h3>Verified?</h3>
      <p>Click here to go to your dashboard.</p>
      <form action="/dashboard">
        <button>Dashboard</button>
      </form>
    </div>
  );
}
