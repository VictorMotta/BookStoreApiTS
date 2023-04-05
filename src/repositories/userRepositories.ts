import connectionDb from '../config/database.js';

async function findByEmail(email: string) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

async function signUp(name: string, email: string, password: string) {
  await connectionDb.query(
    `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}

async function findById(id: number) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE id=$1
  `,
    [id]
  );
}

export default { findByEmail, signUp, findById };
