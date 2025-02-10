\c ai_journal

TRUNCATE TABLE journal_entry_tags, tags, journal_entries, user_contexts, users RESTART IDENTITY CASCADE;


INSERT INTO users (oauth_provider, oauth_id, email, password, first_name, middle_name, last_name, is_verified)
VALUES 
  (NULL, NULL, 'yanakolajara@pursuit.org', '$2b$10$examplehashedpasswordalice', 'Yanako', '', 'Lajara', TRUE);

INSERT INTO journal_entries (user_id, content, description, entry_date, starred)
VALUES
  (1, 'Today was a productive day. I managed to finish my tasks and learned something new.', 'Productive Day', '2025-01-30', TRUE),
  (1, 'A calm day, spent some time reading and reflecting on my goals.', 'Calm Day', '2025-01-31', FALSE);

-- INSERT INTO tags (name)
-- VALUES
--   ('work'),
--   ('personal'),
--   ('learning'),
--   ('meeting');

-- INSERT INTO journal_entry_tags (journal_entry_id, tag_id)
-- VALUES
--   (1, (SELECT id FROM Tags WHERE name='work')),
--   (1, (SELECT id FROM Tags WHERE name='learning'));

-- INSERT INTO JournalEntryTags (journal_entry_id, tag_id)
-- VALUES
--   (2, (SELECT id FROM Tags WHERE name='personal'));

-- INSERT INTO journal_entry_tags (journal_entry_id, tag_id)
-- VALUES
--   (3, (SELECT id FROM Tags WHERE name='work')),
--   (3, (SELECT id FROM Tags WHERE name='meeting'));