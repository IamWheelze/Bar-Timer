import { query } from '../db/connection';

export interface Deadline {
  id: string;
  user_id: string;
  case_name: string;
  case_number?: string;
  court?: string;
  bundesland: string;
  deadline_type: string;
  procedural_code: string;
  event_date: Date;
  duration_value: number;
  duration_unit: string;
  deadline_date: Date;
  start_date: Date;
  extended_from_date?: Date;
  status: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDeadlineInput {
  user_id: string;
  case_name: string;
  case_number?: string;
  court?: string;
  bundesland: string;
  deadline_type: string;
  procedural_code: string;
  event_date: Date;
  duration_value: number;
  duration_unit: string;
  deadline_date: Date;
  start_date: Date;
  extended_from_date?: Date;
  notes?: string;
  created_by: string;
}

export class DeadlineModel {
  static async create(input: CreateDeadlineInput): Promise<Deadline> {
    const result = await query(
      `INSERT INTO deadlines (
        user_id, case_name, case_number, court, bundesland,
        deadline_type, procedural_code, event_date, duration_value, duration_unit,
        deadline_date, start_date, extended_from_date, notes, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        input.user_id, input.case_name, input.case_number, input.court, input.bundesland,
        input.deadline_type, input.procedural_code, input.event_date, input.duration_value, input.duration_unit,
        input.deadline_date, input.start_date, input.extended_from_date, input.notes, input.created_by
      ]
    );

    return result.rows[0];
  }

  static async findByUserId(userId: string, status?: string): Promise<Deadline[]> {
    let queryText = 'SELECT * FROM deadlines WHERE user_id = $1';
    const params: any[] = [userId];

    if (status) {
      queryText += ' AND status = $2';
      params.push(status);
    }

    queryText += ' ORDER BY deadline_date ASC';

    const result = await query(queryText, params);
    return result.rows;
  }

  static async findById(id: string): Promise<Deadline | null> {
    const result = await query('SELECT * FROM deadlines WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: string, updates: Partial<Deadline>): Promise<Deadline> {
    const setClause = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`).join(', ');
    const values = [id, ...Object.values(updates)];

    const result = await query(
      `UPDATE deadlines SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async delete(id: string): Promise<void> {
    await query('DELETE FROM deadlines WHERE id = $1', [id]);
  }

  static async markCompleted(id: string, userId: string, notes?: string): Promise<Deadline> {
    const result = await query(
      `UPDATE deadlines
       SET status = 'completed', completed_at = CURRENT_TIMESTAMP, completed_by = $2, completion_notes = $3
       WHERE id = $1
       RETURNING *`,
      [id, userId, notes]
    );

    return result.rows[0];
  }
}
