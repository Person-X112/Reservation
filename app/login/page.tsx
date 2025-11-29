'use client';
import React, { JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword,  } from 'firebase/auth';
import { auth } from '@lib/firebaseClient';



export default function LoginPage(): JSX.Element {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const validate = () => {
        if (!email || !password) {
            setError('Email and password are required.')
            return false
        }
        // simple email check
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRe.test(email)) {
            setError('Please enter a valid email address.')
            return false
        }
        setError(null)
        return true
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            // Replace with your real login endpoint
            const res = await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err: any) {
            setError('Authentication failed.');
            console.log(err.message);
        } finally {
            setLoading(false)
        }
    }
    async function handleLogin(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();

  // Send token to your backend to create session cookie
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
    }
    return (
        <div style={{
          color: "#734d26",
          padding: 24,
          background: "#dedede",
          height: "100vh"
        }}>
        <div style={{ maxWidth: 420, margin: '4rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8, background: "#eedede",}}>
            <h1 style={{ margin: '0 0 1rem' }}>Sign in</h1>

            <form onSubmit={handleSubmit} aria-label="login form">
                <label style={{ display: 'block', marginBottom: 8 }}>
                    <span style={{ display: 'block', marginBottom: 6 }}>Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: 8, boxSizing: 'border-box', border: '1px solid #341', borderRadius: 8 }}
                        aria-required
                    />
                </label>

                <label style={{ display: 'block', marginBottom: 12 }}>
                    <span style={{ display: 'block', marginBottom: 6 }}>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: 8, boxSizing: 'border-box',border: '1px solid #341', borderRadius: 8  }}
                        aria-required
                    />
                </label>

                <button
                    className='bg-green-600'
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            {error && (
                <div role="alert" style={{ marginTop: 12, color: '#b00020' }}>
                    {error}
                </div>
            )}

            {success && (
                <div role="status" style={{ marginTop: 12, color: '#006400' }}>
                    {success}
                </div>
            )}
</div>
        </div>
    )
}