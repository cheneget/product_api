import { Request, Response } from 'express';
import { pool } from '../utils/db';

export const addProduct = async (req: Request, res: Response) => {
    const { name, price, category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
            [name, price, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const searchProduct = async (req: Request, res: Response) => {
    const { name } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE name ILIKE $1',
            [`%${name}%`]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPaginatedProducts = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const filterProducts = async (req: Request, res: Response) => {
    const { minPrice, maxPrice, name } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE price BETWEEN $1 AND $2 AND name ILIKE $3',
            [minPrice, maxPrice, `%${name}%`]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
