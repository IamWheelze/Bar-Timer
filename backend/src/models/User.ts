import { query } from '../db/connection';
import bcrypt from 'bcrypt';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  bar_admission_number?: string;
  bundesland: string;
  created_at: Date;
  email_verified: boolean;
  is_active: boolean;
}

export interface CreateUserInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bar_admission_number?: string;
  bundesland: string;
}

export class UserModel {
  static async create(input: CreateUserInput): Promise<User> {
    const password_hash = await bcrypt.hash(input.password, 10);

    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, bar_admission_number, bundesland)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, first_name, last_name, bar_admission_number, bundesland, created_at, email_verified, is_active`,
      [input.email, password_hash, input.first_name, input.last_name, input.bar_admission_number, input.bundesland]
    );

    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    );

    return result.rows[0] || null;
  }

  static async findById(id: string): Promise<User | null> {
    const result = await query(
      'SELECT id, email, first_name, last_name, bar_admission_number, bundesland, created_at, email_verified, is_active FROM users WHERE id = $1',
      [id]
    );

    return result.rows[0] || null;
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
