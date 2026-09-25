-- Ghost Factory™ Seed Data for COMBAT RECOVERY LAB OS

INSERT INTO recovery_modalities (code, title, category, base_price_cents, status) VALUES
('CODE-01', 'Contrast Hydrotherapy Circuit (Plunge & Hot Tub)', 'Elite Fighter & Athlete Contrast Recovery Lab OS', 64000, 'ACTIVE'),
('CODE-02', 'Full-Spectrum Infrared Detox & Chromotherapy', 'Elite Fighter & Athlete Contrast Recovery Lab OS', 22500, 'ACTIVE'),
('CODE-03', 'Championship Bout Weight Cut & Rehydration IV', 'Elite Fighter & Athlete Contrast Recovery Lab OS', 28500, 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

INSERT INTO member_sessions (client_name, contact_phone, scheduled_date, deposit_paid_cents, booking_status) VALUES
('Sterling Productions LLC', '+1 (555) 234-5678', CURRENT_DATE, 50000, 'CONFIRMED'),
('Vanguard Athletic Group', '+1 (555) 876-5432', CURRENT_DATE + INTERVAL '1 day', 25000, 'SCHEDULED');

INSERT INTO iv_infusion_logs (session_code, metric_value, verification_hash) VALUES
('SESS-1001', 99.80, 'a7c92b8d0e1f3a5b7c9e0d2f4a6b8c0e'),
('SESS-1002', 100.00, 'b8d0e2f4a6c8e0d2f4a6b8c0e2f4a6b8');
