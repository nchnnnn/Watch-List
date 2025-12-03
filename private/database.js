import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const con = mysql
  .createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  })
  .promise();

// -----------------------------
// Ensure table exists
// -----------------------------
async function ensureTableExists() {
  const sql = `
    CREATE TABLE IF NOT EXISTS tablenotes (
      UID INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(254) NOT NULL,
      episodes INT NOT NULL,
      viewing_status VARCHAR(254) NOT NULL,
      release_status VARCHAR(254) NOT NULL,
      isCheck BOOLEAN NOT NULL DEFAULT 0,
      date_created DATE NOT NULL,
      time_created TIME NOT NULL,
      PRIMARY KEY (UID)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  try {
    await con.query(sql);
  } catch (error) {
    console.error("Error ensuring table exists:", error);
  }
}

con.connect(async (err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + con.threadId);

  await ensureTableExists();
});

// -----------------------------
// Query functions
// -----------------------------
export async function getNotes() {
  try {
    const [rows] = await con.query("SELECT * FROM tablenotes");
    return rows;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return null;
  }
}

export async function getNote(id) {
  try {
    const [rows] = await con.query("SELECT * FROM tablenotes WHERE UID = ?", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching note:", error);
    return null;
  }
}

export async function createNote(
  title,
  episodes,
  viewing_status,
  release_status,
  isCheck,
  date,
  time
) {
  try {
    const [result] = await con.query(
      "INSERT INTO tablenotes (title, episodes, viewing_status, release_status, isCheck, date_created, time_created) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, episodes, viewing_status, release_status, isCheck, date, time]
    );
    return getNote(result.insertId);
  } catch (error) {
    console.error("Error creating note:", error);
    return null;
  }
}

export async function updateNote(id, title) {
  try {
    await con.query("UPDATE tablenotes SET title = ? WHERE UID = ?", [
      title,
      id,
    ]);
  } catch (error) {
    console.error("Error updating note:", error);
    return null;
  }
}

export async function updateCheck(id, isCheck) {
  try {
    await con.query("UPDATE tablenotes SET isCheck = ? WHERE UID = ?", [
      isCheck,
      id,
    ]);
  } catch (error) {
    console.error("Error updating note:", error);
    return null;
  }
}

export async function deleteNote(id) {
  try {
    await con.query("DELETE FROM tablenotes WHERE UID = ?", [id]);
  } catch (error) {
    console.error("Error deleting note:", error);
    return null;
  }
}
