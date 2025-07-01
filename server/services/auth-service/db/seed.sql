\c user_service

TRUNCATE TABLE users RESTART IDENTITY CASCADE;


INSERT INTO users (oauth_provider, oauth_id, email, password, first_name, middle_name, last_name, is_verified)
VALUES 
  (NULL, NULL, 'yanakolajara@pursuit.org', '$2b$10$examplehashedpasswordalice', 'Yanako', '', 'Lajara', TRUE);
