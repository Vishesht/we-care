"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

// Define styles with explicit types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  icon: {
    fontSize: "60px",
    color: "green",
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

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Go back to home after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={styles.container}>
      <div style={styles.icon}>✅</div>
      <h1 style={styles.heading}>Payment Successful</h1>
      <p style={styles.message}>Thank you for your purchase!</p>
      <p style={styles.redirect}>
        You’ll be redirected to the homepage shortly...
      </p>
    </div>
  );
}
