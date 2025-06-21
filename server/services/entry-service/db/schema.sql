DROP DATABASE IF EXISTS scriptum_entries;
CREATE DATABASE scriptum_entries;

\c scriptum_entries;

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL, 
    content TEXT NOT NULL,
    title VARCHAR(255),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    starred BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_entries_user_id ON entries(user_id);