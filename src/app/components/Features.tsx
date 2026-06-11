'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Features.module.css';

const FEATURES = [
    {
        num: '01',
        title: 'Real-Time Transcription & Interpretation',
        description: 'Speak naturally in Hindi and English. MediScribe flawlessly understands medical terminology and context, transcribing and interpreting directly into technical EMR text.'
    },
    {
        num: '02',
        title: 'Zero-Click Auto-EMR Generation',
        description: 'Stop typing. Our AI extracts symptoms, history of present illness, diagnosis, and prescriptions automatically from your conversation without pressing a button.'
    },
    {
        num: '03',
        title: '100% ABDM Compliant Security',
        description: 'Secure, encrypted, and built for the Indian healthcare system. Easily generate compliant patient summaries and push them to relevant systems.'
    }
];

export default function Features() {
    return (
        <section className={styles.featuresSection} id="features">
            <div className={styles.container}>
                <div className={styles.stickyColumn}>
                    <motion.div
                        className={styles.header}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.tag}>Pivotal Efficiency</div>
                        <h2 className={styles.title}>Why India's top doctors rely on MediScribe</h2>
                        <p className={styles.subtitle}>
                            A robust, reliable, and intelligent scribe that turns a chaotic 4-minute appointment into perfect documentation.
                        </p>
                    </motion.div>
                </div>

                <div className={styles.scrollColumn}>
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className={styles.featureCard}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-20%" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className={styles.stepNum}>{feature.num}</span>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{feature.title}</h3>
                                <p className={styles.cardDescription}>{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
