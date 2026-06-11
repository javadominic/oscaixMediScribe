'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroBackground}>
                {/* Background Image layer with opacity */}
                <div className={styles.bgImageContainer}>
                    <img src="/images/doctor-hero-bg.png" alt="Doctor using MediScribe" className={styles.bgImage} />
                    <div className={styles.bgImageGradient}></div>
                </div>

                <div className={styles.glowBlob1}></div>
                <div className={styles.glowBlob2}></div>
                <div className={styles.gridOverlay}></div>
            </div>

            <motion.div
                className={styles.heroContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.badge}>
                    <span className={styles.badgeIcon}>✨</span>
                    <span className={styles.badgeText}>#1 AI Medical Scribe for Indian Doctors</span>
                </div>

                <h1 className={styles.headline}>
                    Stop Typing. Start <span className={styles.highlight}>Healing</span>.
                </h1>

                <p className={styles.subheadline}>
                    MediScribe is the leading AI-powered EMR automation tool built for Indian healthcare. We instantly convert chaotic Hinglish consultations into 100% ABDM-compliant clinical notes.
                </p>

                <motion.ul
                    className={styles.heroFeatureList}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.3, delayChildren: 0.4 } },
                        hidden: {}
                    }}
                >
                    <motion.li variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                        <strong>Save 3 Hours Daily:</strong> Auto-generate EMRs in real-time.
                    </motion.li>
                    <motion.li variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                        <strong>Hinglish Support:</strong> Understands the way Indian doctors actually speak.
                    </motion.li>
                    <motion.li variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                        <strong>Clinical Accuracy:</strong> Advanced safety flags for prescriptions and dosages.
                    </motion.li>
                </motion.ul>

                <div className={styles.ctaGroup}>
                    <button className={styles.primaryCta}>
                        Onboard Your Clinic
                        <span className={styles.ctaArrow}>→</span>
                    </button>
                    <button className={styles.secondaryCta}>
                        Explore the EMR UI
                        <span className={styles.playIcon}>▶</span>
                    </button>
                </div>

                <div className={styles.socialProof}>
                    <div className={styles.avatars}>
                        <div className={styles.avatar}>🧑‍⚕️</div>
                        <div className={styles.avatar}>👨‍⚕️</div>
                        <div className={styles.avatar}>👩‍⚕️</div>
                    </div>
                    <p className={styles.proofText}>Built for the 1.3M doctors of India.</p>
                </div>
            </motion.div>

        </section>
    );
}
