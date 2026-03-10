import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import theme from "../theme";
import logo from "../assets/logo.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Products", path: "/products" },
        { name: "Verify", path: "/verify" },
        { name: "COA", path: "/coa" },
        { name: "Contact", path: "/contact" },
    ];

    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    const socialLinks = [
        {
            icon: "Instagram",
            url: "https://www.instagram.com/miamiproscience",
            component: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8"></path>
                </svg>
            ),
        },
        {
            icon: "Facebook",
            url: "https://www.facebook.com/miamiproscience",
            component: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* NAVBAR */}
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    background: "rgba(20,20,24,0.85)",
                    backdropFilter: "blur(16px)",
                    borderBottom: `1px solid ${theme.colors.border}`,
                    padding: "1rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Link to="/">
                    <img src={logo} alt="Miami Pro Science" style={{ height: "40px" }} />
                </Link>

                {/* Desktop */}
                <div className="desktop-only" style={{ display: "flex", gap: "2rem" }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            style={{
                                textDecoration: "none",
                                fontWeight: 600,
                                color: isActive(link.path)
                                    ? theme.colors.primary
                                    : theme.colors.text.secondary,
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        to="/verify"
                        style={{
                            background: theme.colors.primary,
                            color: "#fff",
                            padding: "0.55rem 1.5rem",
                            borderRadius: "50px",
                            fontWeight: 700,
                            textDecoration: "none",
                        }}
                    >
                        Scan QR
                    </Link>
                </div>

                {/* Mobile Button */}
                <div
                    className="mobile-only"
                    onClick={() => setIsOpen(true)}
                    style={{ fontSize: "1.7rem", cursor: "pointer" }}
                >
                    ☰
                </div>
            </nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* DARK OVERLAY */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "rgba(0,0,0,0.8)",
                                zIndex: 9998,
                            }}
                        />

                        {/* SIDEBAR */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            style={{
                                position: "fixed",
                                right: 0,
                                top: 0,
                                height: "100vh",
                                width: "280px",
                                background: "#0b0b0f",
                                zIndex: 9999,
                                padding: "2rem",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "-40px 0 100px rgba(0,0,0,0.9)",
                            }}
                        >
                            {/* CLOSE */}
                            <div
                                style={{
                                    textAlign: "right",
                                    fontSize: "1.7rem",
                                    cursor: "pointer",
                                    marginBottom: "2rem",
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </div>

                            {/* LINKS */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            textDecoration: "none",
                                            fontSize: "1.2rem",
                                            fontWeight: 700,
                                            color: isActive(link.path)
                                                ? theme.colors.primary
                                                : theme.colors.text.primary,
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            {/* BUTTON */}
                            <Link
                                to="/verify"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    marginTop: "2rem",
                                    background: theme.colors.primary,
                                    color: "#fff",
                                    padding: "1rem",
                                    borderRadius: "10px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    fontWeight: 700,
                                }}
                            >
                                Scan QR
                            </Link>

                            {/* SOCIAL */}
                            <div
                                style={{
                                    marginTop: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "2rem",
                                }}
                            >
                                {socialLinks.map((s) => (
                                    <a key={s.icon} href={s.url} target="_blank" rel="noreferrer">
                                        {s.component}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width:900px){
          .desktop-only{display:none !important;}
          .mobile-only{display:block !important;}
        }
        @media (min-width:901px){
          .desktop-only{display:flex !important;}
          .mobile-only{display:none !important;}
        }
      `}</style>
        </>
    );
};

export default Header;