import { Router } from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {
  register,
  login,
  refreshToken,
  logout,
} from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', (req: Request, res: Response) => register(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', (req: Request, res: Response) => login(req, res));

/**
 * @swagger
 * /api/auth/token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       400:
 *         description: Refresh token is required
 *       403:
 *         description: Invalid refresh token
 */
router.post('/refresh', (req: Request, res: Response) =>
  refreshToken(req, res),
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       400:
 *         description: Refresh token is required
 *       403:
 *         description: Invalid refresh token
 */
router.post('/logout', (req: Request, res: Response) => logout(req, res));

export default router;
