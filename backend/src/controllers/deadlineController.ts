import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { DeadlineModel } from '../models/Deadline';
import { deadlineCalculator } from '../services/deadline-calculator';

export const calculateDeadline = async (req: AuthRequest, res: Response) => {
  try {
    const { event_date, duration_value, duration_unit, bundesland, deadline_type, procedural_code } = req.body;

    const result = deadlineCalculator.calculate({
      eventDate: event_date,
      durationValue: parseInt(duration_value),
      durationUnit: duration_unit,
      bundesland,
      deadlineType: deadline_type,
      proceduralCode: procedural_code
    });

    res.json({ result });
  } catch (error: any) {
    console.error('Calculate deadline error:', error);
    res.status(400).json({ error: error.message || 'Calculation failed' });
  }
};

export const createDeadline = async (req: AuthRequest, res: Response) => {
  try {
    const {
      case_name, case_number, court, bundesland, deadline_type, procedural_code,
      event_date, duration_value, duration_unit, notes
    } = req.body;

    // Calculate the deadline
    const calculation = deadlineCalculator.calculate({
      eventDate: event_date,
      durationValue: parseInt(duration_value),
      durationUnit: duration_unit,
      bundesland,
      deadlineType: deadline_type,
      proceduralCode: procedural_code
    });

    // Create deadline in database
    const deadline = await DeadlineModel.create({
      user_id: req.user!.id,
      case_name,
      case_number,
      court,
      bundesland,
      deadline_type,
      procedural_code,
      event_date: new Date(event_date),
      duration_value: parseInt(duration_value),
      duration_unit,
      deadline_date: calculation.endDateAfterExtension,
      start_date: calculation.startDate,
      extended_from_date: calculation.extendedFromDate,
      notes,
      created_by: req.user!.id
    });

    res.status(201).json({ deadline, calculation });
  } catch (error: any) {
    console.error('Create deadline error:', error);
    res.status(500).json({ error: 'Failed to create deadline' });
  }
};

export const getDeadlines = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const deadlines = await DeadlineModel.findByUserId(req.user!.id, status as string);

    res.json({ deadlines });
  } catch (error) {
    console.error('Get deadlines error:', error);
    res.status(500).json({ error: 'Failed to fetch deadlines' });
  }
};

export const getDeadline = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deadline = await DeadlineModel.findById(id);

    if (!deadline) {
      return res.status(404).json({ error: 'Deadline not found' });
    }

    if (deadline.user_id !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ deadline });
  } catch (error) {
    console.error('Get deadline error:', error);
    res.status(500).json({ error: 'Failed to fetch deadline' });
  }
};

export const updateDeadline = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const deadline = await DeadlineModel.findById(id);
    if (!deadline) {
      return res.status(404).json({ error: 'Deadline not found' });
    }

    if (deadline.user_id !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updated = await DeadlineModel.update(id, updates);
    res.json({ deadline: updated });
  } catch (error) {
    console.error('Update deadline error:', error);
    res.status(500).json({ error: 'Failed to update deadline' });
  }
};

export const deleteDeadline = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const deadline = await DeadlineModel.findById(id);
    if (!deadline) {
      return res.status(404).json({ error: 'Deadline not found' });
    }

    if (deadline.user_id !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await DeadlineModel.delete(id);
    res.json({ message: 'Deadline deleted successfully' });
  } catch (error) {
    console.error('Delete deadline error:', error);
    res.status(500).json({ error: 'Failed to delete deadline' });
  }
};

export const completeDeadline = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const deadline = await DeadlineModel.findById(id);
    if (!deadline) {
      return res.status(404).json({ error: 'Deadline not found' });
    }

    if (deadline.user_id !== req.user!.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const completed = await DeadlineModel.markCompleted(id, req.user!.id, notes);
    res.json({ deadline: completed });
  } catch (error) {
    console.error('Complete deadline error:', error);
    res.status(500).json({ error: 'Failed to complete deadline' });
  }
};
