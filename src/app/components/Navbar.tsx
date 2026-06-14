import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <span className={styles.logoIcon}>☤</span>
                    <span className={styles.logoText}>MediScribe</span>
                </div>

                <div className={styles.navLinks}>
                    <a href="#features" className={styles.link}>Features</a>
                    <a href="#how-it-works" className={styles.link}>How it Works</a>
                    <a href="#pricing" className={styles.link}>Pricing</a>
                </div>

                <div className={styles.navActions}>
                    <a href="/login" className={styles.loginBtn}>Log In</a>
                    <a href="/demo" className={styles.demoBtn} style={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', border: 'none' }}>🏆 Judge Demo</a>
                    <a href="/login" className={styles.ctaBtn}>Get Started</a>
                </div>
            </div>
        </nav>
    );
}
