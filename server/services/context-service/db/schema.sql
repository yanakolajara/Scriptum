DROP DATABASE IF EXISTS context_service;
CREATE DATABASE context_service;

\c context_service;

DROP TABLE IF EXISTS contexts;

CREATE TABLE contexts (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,       
    context TEXT NOT NULL,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contexts_user_id ON contexts(user_id);