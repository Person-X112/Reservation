// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebaseClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


// === Zod Schema ===
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().length (10, "Phone number must be 10 digits"),
    //.string()
    //.regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format: 123-456-7890"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    ),
});
type SignupFormData = z.infer<typeof signupSchema>;


const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");
  // const [username, setUsername] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
 // const formatPhone = (value: string) => {
  
  
  // Format phone number as XXX-XXX-XXXX
  // const digits = value.replace(/\D/g, "").slice(0, 10);
  // if (digits.length <= 3) return digits;
  // if (digits.length <= 6)
  //   return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  // return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  // };

  const onSubmit = async (data: SignupFormData) => {
    //e.preventDefault();
    try {
      
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      //Adding document to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        phone: data.phone,
        name: data.username,
        createdAt: serverTimestamp(),
        role: "client",
      });
      await updateProfile(cred.user, {
        displayName: data.username,
      });
      console.log("User document created with ID: ", cred.user.uid);
      router.push("/");
      console.log(await(cookieStore.get('session')));
    } catch (err: any) {
      setError(err.message||"An error occurred during signup.");
    }

    //listening for auth change
    onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    // Show logged in state/UI
  } else {
    console.log("User is logged out");
    // Show login screen/UI
  }
});

  };

  return ( <div style={{
          color: "#734d26",
          textAlign: "center",
          padding: 24,
          background: "#dedede",
          height: "100vh",
        }}>
    <form style={{
          color: "#734d26",
          textAlign: "center",
          padding: 24,
          background: "#dedede",
        }} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto p-8">
      <input
        type="email"
        {...register("email")}
        disabled={isSubmitting}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border rounded"
        required
      />
      {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      <input
        type="number"
        {...register("phone")}
        disabled={isSubmitting}
        placeholder="Phone Number"
        className="p-2 border rounded no-spinners"
        required
      />
      {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      <input
        type="text"
        {...register("username")}
        disabled={isSubmitting}
        placeholder="Username"
        className="p-2 border rounded"
        required
      />
      {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      <input
        type="password"
        {...register("password")}
        disabled={isSubmitting}
        placeholder="Password"
        className="p-2 border rounded"
        required
      />
      {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      <button type="submit" className="bg-green-600 text-white rounded p-2">Sign Up</button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
</div>  );
};

export default SignupPage;
