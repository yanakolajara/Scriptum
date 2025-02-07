DROP DATABASE IF EXISTS ai_journal;
CREATE DATABASE ai_journal;

\c ai_journal;

-- DROP TABLE IF EXISTS JournalEntryTags;
-- DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS journal_entries;
DROP TABLE IF EXISTS user_contexts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),                 
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE   
);

CREATE TABLE user_contexts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,       
    context TEXT NOT NULL,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,                 
    description VARCHAR(255),              
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    starred BOOLEAN DEFAULT FALSE,         
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CREATE TABLE tags (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE journal_entry_tags (
--     id SERIAL PRIMARY KEY,
--     journal_entry_id INTEGER NOT NULL,
--     tag_id INTEGER NOT NULL,
--     FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE,
--     FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
--     UNIQUE (journal_entry_id, tag_id)
-- );