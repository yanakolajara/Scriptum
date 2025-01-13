\c ai_journal

-- Reset data
TRUNCATE TABLE user_memory, user_context, conversation_summaries, messages, conversations, users RESTART IDENTITY CASCADE;

-- Insert user
INSERT INTO users (id, name, email) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Alex Johnson', 'alex.johnson@example.com');

-- Insert conversations
INSERT INTO conversations (id, user_id, title) 
VALUES 
('111e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Reflecting on Productivity'),
('222e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Managing Stress at Work');

-- Insert messages for first conversation
INSERT INTO messages (id, conversation_id, sender, content) 
VALUES 
('aaa11100-e29b-41d4-a716-446655440000', '111e8400-e29b-41d4-a716-446655440000', 'user', 'I feel like I was productive today, but I still think I could do more.'),
('bbb11100-e29b-41d4-a716-446655440000', '111e8400-e29b-41d4-a716-446655440000', 'ai', 'It’s great that you feel productive! What would you like to improve for tomorrow?');

-- Insert messages for second conversation
INSERT INTO messages (id, conversation_id, sender, content) 
VALUES 
('aaa22200-e29b-41d4-a716-446655440000', '222e8400-e29b-41d4-a716-446655440000', 'user', 'I had a stressful day at work. Deadlines were overwhelming.'),
('bbb22200-e29b-41d4-a716-446655440000', '222e8400-e29b-41d4-a716-446655440000', 'ai', 'That sounds tough. Have you tried breaking tasks into smaller parts to make them more manageable?');

-- Insert user memory (Long-term learned details)
INSERT INTO user_memory (id, user_id, memory) 
VALUES 
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Alex is focused on improving productivity and managing work-related stress.');

-- Insert user context (Immediate learned context)
INSERT INTO user_context (id, user_id, context) 
VALUES 
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'Currently struggling with work stress, especially deadlines.');

-- Insert conversation summaries
INSERT INTO conversation_summaries (id, conversation_id, summary) 
VALUES 
(gen_random_uuid(), '111e8400-e29b-41d4-a716-446655440000', 'Today I was productive, but I feel like I can do more. I want to find ways to improve my efficiency.'),
(gen_random_uuid(), '222e8400-e29b-41d4-a716-446655440000', 'Work was stressful today due to deadlines. I should try breaking tasks into smaller steps.');