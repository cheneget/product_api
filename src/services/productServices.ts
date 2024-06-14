import { Pool } from 'pg';
import { Product } from '../models/product';
import { pool } from '../utils/db';

export class ProductService {
    // Add a new product
    async addProduct(product: Product): Promise<Product> {
        const { name, price, category } = product;
        const result = await pool.query(
            'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
            [name, price, category]
        );
        return result.rows[0];
    }

    // Search for products by name
    async searchProduct(name: string): Promise<Product[]> {
        const result = await pool.query(
            'SELECT * FROM products WHERE name ILIKE $1',
            [`%${name}%`]
        );
        return result.rows;
    }

    // Get paginated list of products
    async getPaginatedProducts(limit: number, offset: number): Promise<Product[]> {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        return result.rows;
    }

    // Filter products by price range and name
    async filterProducts(minPrice: number, maxPrice: number, name: string): Promise<Product[]> {
        const result = await pool.query(
            'SELECT * FROM products WHERE price BETWEEN $1 AND $2 AND name ILIKE $3',
            [minPrice, maxPrice, `%${name}%`]
        );
        return result.rows;
    }
}
