'use client';
import React, { useState } from 'react';
import styles from '../Dashboard.module.css';
import { useGlobalState } from '../GlobalStateContext';

export default function ReceptionistIntakePage() {
    const { patients, addPatient } = useGlobalState();

    // Form State
    const [fullName, setFullName] = useState('');
    const [ageGender, setAgeGender] = useState('');
    const [abhaId, setAbhaId] = useState('');
    const [contact, setContact] = useState('');
    const [doctor, setDoctor] = useState('Dr. Rajesh Sharma');

    // OTP State
    const [otpSent, setOtpSent] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const handleSendOtp = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!contact.trim() || contact.length < 10) {
            alert('Please enter a valid 10-digit mobile number first.');
            return;
        }
        const code = String(Math.floor(1000 + Math.random() * 9000));
        setGeneratedOtp(code);
        setOtpSent(true);
        alert(`ABDM Security Gateway: Verification code sent to ${contact}: ${code}`);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !contact.trim()) return;

        // Removed ABHA ID validation to allow skipping

        if (!otpSent) {
            alert('Please send and verify the OTP before registering the patient.');
            return;
        }

        if (otpInput !== generatedOtp) {
            alert('Invalid OTP. Please enter the verification code sent to your device.');
            return;
        }

        const newId = abhaId.trim();
        const now = new Date();
        const timeStr = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

        const newRecord = {
            id: newId,
            isLinked: true,
            abhaId: abhaId.trim(),
            name: fullName,
            age: ageGender || 'Unknown',
            contact: contact,
            time: timeStr,
            condition: 'Pending Intake',
            diagnosis: 'Pending Intake',
            status: 'Waiting',
            statusColor: 'warning',
            stat: 'Waiting',
            hpi: 'Pending exam overview...',
            safetyFlag: null,
            assessment: ['Pending transcription.'],
            vitals: 'Pending Vitals Check',
            assignedDoctor: doctor
        };

        addPatient(newRecord);

        // Reset form
        setFullName('');
        setAgeGender('');
        setAbhaId('');
        setContact('');
        setOtpSent(false);
        setOtpInput('');
    };

    return (
        <div className={styles.dashboardContent}>
            <div className={styles.topHeader} style={{ marginBottom: '8px' }}>
                <h1 className={styles.pageTitle}>Receptionist Intake Dashboard</h1>
                <div className={styles.headerActions}>
                    <div className={styles.searchBar}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input type="text" placeholder="Search by name, ID, or phone..." className={styles.searchInput} />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '600px' }}>
                {/* Panel 1: Add New Patient */}
                <div className={styles.workflowCard} style={{ padding: '24px' }}>
                    <h3 className={styles.sectionHeader} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '20px' }}>
                        Patient Details
                    </h3>

                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Patient Mobile Number *</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    required
                                    value={contact}
                                    onChange={e => { setContact(e.target.value); setOtpSent(false); }}
                                    placeholder="+91 98765 43210"
                                    style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
                                />
                                {!otpSent && (
                                    <button onClick={handleSendOtp} type="button" style={{ background: 'var(--color-workspace-bg)', color: 'var(--color-text-primary)', border: '1px solid rgba(255,255,255,0.2)', padding: '0 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                                        Send OTP
                                    </button>
                                )}
                            </div>
                        </div>

                        {otpSent && (
                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '8px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-accent-green)', marginBottom: '6px', fontWeight: '600' }}>Enter Verification Code</label>
                                <input
                                    required
                                    value={otpInput}
                                    onChange={e => setOtpInput(e.target.value)}
                                    placeholder="4-digit OTP"
                                    maxLength={4}
                                    style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: 'var(--color-text-primary)', letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
                                />
                            </div>
                        )}

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Full Name *</label>
                            <input
                                required
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="e.g. Priya Sharma"
                                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Age/Gender</label>
                            <input
                                value={ageGender}
                                onChange={e => setAgeGender(e.target.value)}
                                placeholder="e.g. 34F"
                                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>
                                ABHA ID (ABDM Link) * <span style={{ fontSize: '11px', color: '#ef4444' }}>Compulsory</span>
                                <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-alert-amber)', marginTop: '2px', fontStyle: 'italic' }}>
                                    (We are working with the government to get the live integration working, as it takes time. Any mock ID will work for the demo.)
                                </span>
                            </label>
                            <input
                                required
                                value={abhaId}
                                onChange={e => setAbhaId(e.target.value)}
                                placeholder="e.g. 91-1234-5678-9012"
                                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Select Appointment Doctor</label>
                            <select
                                value={doctor}
                                onChange={e => setDoctor(e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', background: 'var(--color-workspace-bg)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--color-text-primary)', cursor: 'pointer' }}
                            >
                                <option>Dr. Rajesh Sharma</option>
                                <option>Dr. Anjali Desai</option>
                                <option>Dr. Vikram Singh</option>
                            </select>
                        </div>

                        <button type="submit" style={{ marginTop: '12px', background: otpSent && otpInput.length === 4 ? 'var(--color-accent-green)' : 'rgba(255,255,255,0.1)', color: otpSent && otpInput.length === 4 ? '#fff' : 'var(--color-text-secondary)', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: otpSent && otpInput.length === 4 ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                            Verify & Register Patient
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
