CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    "password" text UNIQUE NOT NULL
);

INSERT INTO users(email, "password")
    VALUES ('user1@email.com', '$2b$10$gD3/O8SyGzp1mIXj0aymfuq0yVzM48pYmUpM/aq25ypnlmYgC/Xsu');

