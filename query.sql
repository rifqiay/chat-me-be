-- Active: 1678001693436@@127.0.0.1@5432@telegrams@public
CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(50),
    username VARCHAR(20),
    bio VARCHAR(255),
    photo VARCHAR(255),
    phone VARCHAR(13),
    is_verified BOOLEAN,
    token VARCHAR(255),
    email VARCHAR(50),
    password VARCHAR(255)
);

CREATE TABLE chats (
    id VARCHAR(255) PRIMARY KEY,
    sender_id VARCHAR(255),
    receiver_id VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (sender_id) REFERENCES users(id) on delete CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) on delete CASCADE
);


SELECT users.id, users.name, users.username, users.bio, users.photo, users.phone FROM users WHERE id='66171b97-d13a-4e9a-a16d-6b4f7dbb34e0';

UPDATE users SET phone='phone' WHERE id='66171b97-d13a-4e9a-a16d-6b4f7dbb34e0';

SELECT * FROM users;