DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS notes;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE quotes(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    quote VARCHAR NOT NULL,
    author VARCHAR NOT NULL
);

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status INTEGER NOT NULL,
    title VARCHAR,
    author VARCHAR,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    note VARCHAR,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);

INSERT INTO quotes (type, quote, author) VALUES ('inspiration', 'Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.', 'Charles William Eliot');
INSERT INTO quotes (type, quote, author) VALUES ('motivation', 'Today a reader, tomorrow a leader.', 'Margaret Fuller');
INSERT INTO quotes (type, quote, author) VALUES ('motivation', 'To acquire the habit of reading is to construct for yourself a refuge from almost all the miseries of life.', 'W. Somerset Maugham');
INSERT INTO quotes (type, quote, author) VALUES ('inspiration', 'Show me a family of readers, and I will show you the people who move the world.', ' Napoléon Bonaparte');
INSERT INTO quotes (type, quote, author) VALUES ('motivation', 'No matter how busy you may think you are, you must find time for reading, or surrender yourself to self-chosen ignorance.', 'Atwood H. Townsend');
INSERT INTO quotes (type, quote, author) VALUES ('inspiration', 'Despite the enormous quantity of books, how few people read! And if one reads profitably, one would realize how much stupid stuff the vulgar herd is content to swallow every day.', 'Voltaire');



-- books status:
-- 1=> added
-- 2=> currently Reading
-- 3=> read
