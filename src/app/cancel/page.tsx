"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCancelled() {
  const navigate = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.icon}>❌</div>
      <h1 style={styles.heading}>Payment Cancelled</h1>
      <p style={styles.message}>
        Your payment was not completed. Please try again.
      </p>
      <p style={styles.redirect}>
        You’ll be redirected to the homepage shortly...
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  icon: {
    fontSize: "60px",
    color: "red",
  },
  heading: {
    fontSize: "2rem",
    margin: "20px 0 10px",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "5px",
  },
  redirect: {
    fontSize: "0.9rem",
    color: "#555",
  },
};
