import { pool } from '../config/db.js';

export const ReportModel = {
  async getStats() {
    const [books, authors, categories, borrows] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM books'),
      pool.query('SELECT COUNT(*) FROM authors'),
      pool.query('SELECT COUNT(*) FROM categories'),
      pool.query("SELECT COUNT(*) FROM loans WHERE status = 'BORROWED'"),
    ]);

    return {
      total_books: parseInt(books.rows[0].count),
      total_authors: parseInt(authors.rows[0].count),
      total_categories: parseInt(categories.rows[0].count),
      active_borrows: parseInt(borrows.rows[0].count),
    };
  }
};