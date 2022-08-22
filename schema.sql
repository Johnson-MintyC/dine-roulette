DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    long TEXT NOT NULL,
    lati TEXT NOT NULL,
    user_id SERIAL REFERENCES users (id) ON DELETE CASCADE
)