SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'scriptum' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS scriptum;
CREATE DATABASE scriptum;
\c scriptum;

-- DROP TABLE IF EXISTS JournalEntryTags;
-- DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS mfa_codes;
DROP TABLE IF EXISTS journal_entries;
DROP TABLE IF EXISTS user_contexts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    mfa BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_contexts (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,       
    context TEXT NOT NULL,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,                 
    description VARCHAR(255),              
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    starred BOOLEAN DEFAULT FALSE,         
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE mfa_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CREATE TABLE tags (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE journal_entry_tags (
--     id SERIAL PRIMARY KEY,
--     journal_entry_id INTEGER NOT NULL,
--     tag_id INTEGER NOT NULL,
--     FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE,
--     FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
--     UNIQUE (journal_entry_id, tag_id)
-- );