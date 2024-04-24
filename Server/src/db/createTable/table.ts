import client from "../DB_setup/postgresSetup";

async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        neo4j_id VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;

  const createProfilesTable = `
    CREATE TABLE IF NOT EXISTS profiles (
        user_id INTEGER REFERENCES users(user_id),
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(15),
        photo_url VARCHAR(255),
        background_url VARCHAR(255),
        about VARCHAR(255),
        designation VARCHAR(255),
        insta_url VARCHAR(255),
        twitter_url VARCHAR(255),
        linkedln_url VARCHAR(255)
    );`;

  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        post_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`;

  const createPostDetailsTable = `
    CREATE TABLE IF NOT EXISTS post_details (
        post_id INTEGER PRIMARY KEY,
        content TEXT,
        content_url VARCHAR(255),
        likes_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(post_id)
    );`;

  const createConnectionRequestsTable = `
    CREATE TABLE IF NOT EXISTS connection_request (
        request_id SERIAL PRIMARY KEY,
        sender_id INTEGER NOT NULL,
        received_id INTEGER NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (sender_id, received_id),
        FOREIGN KEY (sender_id) REFERENCES users(user_id),
        FOREIGN KEY (received_id) REFERENCES users(user_id)
    );`;

  try {
    await client.query(createUsersTable);
    await client.query(createProfilesTable);
    await client.query(createPostsTable);
    await client.query(createPostDetailsTable);
    await client.query(createConnectionRequestsTable);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

export default createTables;
