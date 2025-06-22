DROP DATABASE IF EXISTS scriptum_user_contexts;
CREATE DATABASE scriptum_user_contexts;

\c scriptum_user_contexts;

DROP TABLE IF EXISTS ;

CREATE TABLE user_contexts (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,       
    context TEXT NOT NULL,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_contexts_user_id ON user_contexts(user_id);