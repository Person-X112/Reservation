'use client';
// pages/reservation.js
import { useEffect, useState } from "react";
import { auth, db } from "@lib/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

const OPENING_HOUR=8;
const CLOSING_HOUR=22;
const TIME_BUFFER_MINUTES=10;
const CLOSING_BUFFER_MINUTES=30;

export default function Reservation() {
  const [user, setUser] = useState(null as User | null);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    date: "",
    time: "",
    partySize: 1,
    notes: ""
  });
  const [loading, setLoading] = useState(false);

  // Listen for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        setForm((prev) => ({
          ...prev,
          customerName: u.displayName || "",
          phone: u.phoneNumber || ""
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle input changes
  function handleChange(e: { target: { name: any; value: any; }; }) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Submit reservation
  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!form.date || !form.time) {
      alert("Please select date and time.");
      return;
    }
    setLoading(true);
    await addDoc(collection(db, "reservations"), {
      ...form,
      userId: user ? user.uid : null,
      createdAt: new Date(),
      status: "pending"
    });
    setLoading(false);
    alert("Reservation requested!");
    setForm({
      customerName: user?.displayName  || "",
      phone: user?.phoneNumber || "",
      date: "",
      time: "",
      partySize: 1,
      notes: ""
    });
  }

  return (
    <div style={{
          color: "#734d26",
          textAlign: "center",
          padding: 24,
          background: "#dedede",
          height: "100vh"
        }}>
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 16, border: "1px solid #511f1fff", borderRadius: 8 }}>
      <h2>Reserve a Table</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="customerName"
          placeholder="Name"
          value={form.customerName}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8, border: "1px solid #511f1fff", borderRadius: 4, padding: 8 }}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          maxLength={10}
          minLength={10}
          required
          style={{ width: "100%", marginBottom: 8, border: "1px solid #511f1fff", borderRadius: 4, padding: 8 }}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          min={new Date().toDateString()}
          style={{ width: "100%", marginBottom: 8, border: "1px solid #511f1fff", borderRadius: 4, padding: 8 }}
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8, border: "1px solid #511f1fff", borderRadius: 4, padding: 8 }}
        />
        <input
          name="partySize"
          type="number"
          value={form.partySize}
          min={1}
          max={20}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8, border: "1px solid #511f1fff", borderRadius: 4, padding: 8 }}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, border: "1px solid #511f1fff", borderRadius: 4, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Submitting..." : "Reserve"}
        </button>
      </form>
      {!user && (
        <div style={{ marginTop: 16 }}>
          <p>Login for autofill & more features:</p>
          {/* Redirect to login/signup page, or open FirebaseUI/modal */}
          <a href="/login"><button style={{ width: "100%" }}>Login / Signup (optional)</button></a>
        </div>
      )}
    </div>
</div>  );
}
