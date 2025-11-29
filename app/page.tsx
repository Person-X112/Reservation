'use client';
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        background: "#f7f6f2",
        minHeight: "100vh",
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 70,
          background: "#111a23",
          color: "#fff",
          zIndex: 99,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "1.3rem" }}>Cafe Aroma</span>
        <div className="navLinks" style={{ display: "flex", gap: 28 }}>
          <NavLinks vertical={false} onClick={()=>{}} />
        </div>
        <button
          className="navHamburger"
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            fontSize: "2rem",
            color: "#fff",
          }}
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          &#9776;
        </button>
      </nav>

      {/* Mobile navbar overlay */}
      {mobileNavOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(17,26,35,0.98)",
            color: "#fff",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
          }}
        >
          <NavLinks onClick={() => setMobileNavOpen(false)} vertical />
          <button
            style={{
              marginTop: 30,
              fontSize: "1.5rem",
              background: "transparent",
              color: "#fff",
              border: "none",
            }}
            onClick={() => setMobileNavOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Sections */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "url(/hero-cafe.jpg) center/cover no-repeat",
          color: "#fff",
          scrollSnapAlign: "start",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            padding: "3rem",
            borderRadius: 18,
            textAlign: "center",
            maxWidth: 450,
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: 0 }}>Cafe Aroma</h1>
          <p style={{ fontSize: "1.4rem", marginTop: 12 }}>
            The city's coziest spot for coffee, chats, and chill.
          </p>
        </div>
        {/* Fallback if hero image missing */}
        <style>{`
          #hero {
            background-image: url('/hero-cafe.jpg'), linear-gradient(120deg, #a58b61 60%, #d2c6bb 100%);
          }
        `}</style>
      </section>

      <section
        id="reservation"
        style={{
          minHeight: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff9eb",
          scrollSnapAlign: "start",
        }}
      >
        <h2 style={{color: "#734d26"}}>Make a Reservation</h2>
        <div style={{ color: "#734d26", display: "flex", gap: 16 }}>
          <Link href="/reservation"><button style={btn}>Reserve</button></Link>
          <Link href="/login"><button style={btn}>Login</button></Link>
          <Link href="/signup"><button style={btn}>Signup</button></Link>
        </div>
        <p style={{ fontSize: "0.95rem", color: "#734d26", marginTop: 16 }}>
          Walk-ins welcome! Or book online & skip the wait.
        </p>
      </section>

      <section
        id="gallery"
        style={{
          color: "#734d26",
          minHeight: "100vh",
          height: "100vh",
          scrollSnapAlign: "start",
          background: "#f7f6f2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Gallery</h2>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {["gallery1.jpg", "gallery2.jpg", "gallery3.jpg"].map((src, i) => (
            <ImageWithFallback key={i} src={`/${src}`} alt={`Gallery ${i + 1}`} />
          ))}
        </div>
      </section>

      <section
        id="menu"
        style={{
          color: "#734d26",
          minHeight: "100vh",
          height: "100vh",
          scrollSnapAlign: "start",
          background: "#e1eaf7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Menu</h2>
        <ul style={{ columns: 2, fontSize: "1.1rem", padding: 0 }}>
          <li>Espresso</li>
          <li>Americano</li>
          <li>Cappuccino</li>
          <li>Latte</li>
          <li>Mocha</li>
          <li>Hot Chocolate</li>
          <li>Fresh Sandwiches</li>
          <li>Salads</li>
          <li>Pastries</li>
          <li>Seasonal Specials</li>
        </ul>
      </section>

      <section
        id="about"
        style={{
          color: "#734d26",
          minHeight: "100vh",
          height: "100vh",
          scrollSnapAlign: "start",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
        }}
      >
        <h2>About Us</h2>
        <p style={{ color: "#734d26", maxWidth: 520, lineHeight: 1.5, fontSize: "1.1rem" }}>
          Founded in 2020, Cafe Aroma is your living room—just with better coffee. Warm vibes and passionate baristas mean every cup is a treat, whether you're studying, working, or hanging out with friends. Join us at 123 Main Street, open daily 8am–10pm.
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          color: "#734d26",
          textAlign: "center",
          padding: 24,
          background: "#dedede",
        }}
      >
        &copy; {new Date().getFullYear()} Cafe Aroma · All rights reserved
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 800px) {
          ul { columns: 1 !important; }
        }
        nav .navHamburger { display: block !important; }
        nav .navLinks { display: none !important; }
        @media (min-width: 800px) {
          nav .navHamburger { display: none !important; }
          nav .navLinks { display: flex !important; }
        }
        section { scroll-snap-align: start; }
      `}</style>
    </main>
  );
}

function NavLinks({ vertical, onClick }: { vertical?: boolean; onClick: ()=> void}) {
  const links = [
    { href: "#hero", label: "Home" },
    { href: "#reservation", label: "Reserve" },
    { href: "#gallery", label: "Gallery" },
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
  ];
  return (
    <>
      {links.map((v, i) => (
        <a
          key={i}
          href={v.href}
          onClick={onClick}
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: vertical ? "0.8em 0" : "0 10px",
            fontSize: vertical ? "1.25em" : "1em",
            fontWeight: 500,
          }}
        >
          {v.label}
        </a>
      ))}
    </>
  );
}

// Image component with fallback for missing images
function ImageWithFallback({ src, alt }:{ src: string; alt: string }) {
  const [error, setError] = useState(false);
  return error ? (
    <div
      style={{
        width: 200,
        height: 140,
        background: "#ddd",
        color: "#888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        fontSize: 19,
        fontWeight: 600,
      }}
    >
      No image
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      style={{
        width: 200,
        height: 140,
        objectFit: "cover",
        borderRadius: 8,
        boxShadow: "0 1px 6px #bbb",
      }}
      onError={() => setError(true)}
    />
  );
}

const btn = {
  padding: "0.65rem 1.3rem",
  background: "#e8c097",
  border: "none",
  borderRadius: 6,
  fontWeight: 600,
  cursor: "pointer",
};

