import { Client } from "pg";
import { User } from "./entities";
import bcrypt from "bcrypt";

export interface UserHelper {
  createUser: (user: User) => Promise<User | undefined>;
  verifyUser: (user: User) => Promise<User | undefined>;
  getUsers: () => Promise<User[] | undefined>;
  getUserById: (id: number) => Promise<User | undefined>;
  getUserByemail: (email: string) => Promise<User | undefined>;
}

export default function UserHelper(db: Client): UserHelper {
  async function createUser(user: User): Promise<User | undefined> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const values = [user.email, hashedPassword];
      const res = await db.query(
        `
      INSERT INTO users (
        email,
        password
    ) VALUES 
    ($1, $2) RETURNING *
    `,
        values
      );

      const rows: User[] = res.rows;
      return rows[0];
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }

  async function verifyUser(user: User): Promise<User | undefined> {
    try {
      const values = [user.email];
      const res = await db.query(
        "SELECT * FROM users WHERE email=$1; ",
        values
      );

      const rows: User[] = res.rows;
      if (!rows.length) {
        return;
      }
      const storedUser = rows[0];
      const isValid = await bcrypt.compare(user.password, storedUser.password);

      if (!isValid) {
        return;
      }
      const { password, ...restUser } = storedUser;
      return restUser as User;
    } catch (err) {
      console.error("Error verifying user:", err);
    }
  }

  async function getUserById(id: number) {
    try {
      const values = [id];
      const res = await db.query(
        "select * FROM users WHERE id=$1 LIMIT 1;",
        values
      );
      const rows: User[] = res.rows;
      if (rows.length) {
        const { password, ...rest } = rows[0];
        return rest as User;
      }
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }

  async function getUserByemail(email: string) {
    try {
      const values = [email];
      const res = await db.query(
        "select * FROM users WHERE id=$1 LIMIT 1;",
        values
      );
      const rows: User[] = res.rows;
      if (rows.length) {
        const { password, ...rest } = rows[0];
        return rest as User;
      }
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }

  async function getUsers() {
    try {
      const res = await db.query("select * from users;");
      const rows: User[] = res.rows;
      return rows;
    } catch (err) {
      console.error("Error inserting data:", err);
    }
  }
  return {
    createUser,
    verifyUser,
    getUsers,
    getUserByemail,
    getUserById,
  };
}
