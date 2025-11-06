-- German Lawyer Deadline Management System - Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    bar_admission_number VARCHAR(50),
    bundesland VARCHAR(2) NOT NULL, -- DE state code (BY, BE, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Deadlines table
CREATE TABLE deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Case information
    case_name VARCHAR(255) NOT NULL,
    case_number VARCHAR(100),
    court VARCHAR(255),
    bundesland VARCHAR(2) NOT NULL,

    -- Deadline information
    deadline_type VARCHAR(50) NOT NULL, -- Notfrist, Ereignisfrist, Richterliche Frist
    procedural_code VARCHAR(20) NOT NULL, -- ZPO, VwGO, StPO, etc.

    -- Calculation inputs
    event_date DATE NOT NULL, -- Triggering event (judgment served, etc.)
    duration_value INTEGER NOT NULL, -- 1, 2, 3, etc.
    duration_unit VARCHAR(20) NOT NULL, -- days, weeks, months

    -- Calculated results
    deadline_date DATE NOT NULL, -- Final calculated deadline
    start_date DATE NOT NULL, -- Day after event (§ 187 BGB)
    extended_from_date DATE, -- If extended due to holiday/weekend

    -- Status
    status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by UUID REFERENCES users(id),
    completion_notes TEXT,

    -- Additional metadata
    notes TEXT,
    opposing_counsel VARCHAR(255),
    responsible_lawyer UUID REFERENCES users(id),

    -- Audit trail
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL REFERENCES users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id),

    -- Notifications
    notify_14_days BOOLEAN DEFAULT TRUE,
    notify_7_days BOOLEAN DEFAULT TRUE,
    notify_3_days BOOLEAN DEFAULT TRUE,
    notify_1_day BOOLEAN DEFAULT TRUE,
    last_notification_sent TIMESTAMP WITH TIME ZONE
);

-- Audit log for all deadline changes
CREATE TABLE deadline_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deadline_id UUID NOT NULL REFERENCES deadlines(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL, -- created, updated, deleted, completed
    changes JSONB, -- Store what changed
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- German holidays master data
CREATE TABLE german_holidays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    bundesland VARCHAR(2), -- NULL = nationwide holiday
    year INTEGER NOT NULL,
    is_nationwide BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_deadlines_user_id ON deadlines(user_id);
CREATE INDEX idx_deadlines_deadline_date ON deadlines(deadline_date);
CREATE INDEX idx_deadlines_status ON deadlines(status);
CREATE INDEX idx_deadlines_bundesland ON deadlines(bundesland);
CREATE INDEX idx_audit_deadline_id ON deadline_audit_log(deadline_id);
CREATE INDEX idx_audit_timestamp ON deadline_audit_log(timestamp);
CREATE INDEX idx_holidays_date_bundesland ON german_holidays(date, bundesland);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deadlines_updated_at BEFORE UPDATE ON deadlines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
