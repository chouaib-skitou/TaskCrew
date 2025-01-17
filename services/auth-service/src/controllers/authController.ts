/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!jwtSecret || !jwtRefreshSecret) {
  throw new Error('JWT_SECRET or JWT_REFRESH_SECRET is not defined');
}

const refreshTokens: Record<string, string> = {};

const generateAccessToken = (userId: string) =>
  jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' });

const generateRefreshToken = (userId: string) =>
  jwt.sign({ id: userId }, jwtRefreshSecret, { expiresIn: '7d' });

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userResponse = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users?email=${email}`,
    );
    if (userResponse.data) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await axios.post(
      `${process.env.USER_SERVICE_URL}/api/users`,
      { name, email, password: hashedPassword },
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.data,
    });
  } catch (error: unknown) {
    res
      .status(500)
      .json({ message: 'Server error', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userResponse = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users/email/${email}`,
    );
    const user = userResponse.data;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    refreshTokens[user.id] = refreshToken;

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error: unknown) {
    res
      .status(500)
      .json({ message: 'Server error', error: (error as Error).message });
  }
};

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    const decoded: DecodedToken = jwt.verify(
      token,
      jwtRefreshSecret,
    ) as DecodedToken;

    if (!refreshTokens[decoded.id] || refreshTokens[decoded.id] !== token) {
      res.status(403).json({ message: 'Invalid refresh token' });
      return;
    }

    const accessToken = generateAccessToken(decoded.id);

    res.status(200).json({ accessToken, refreshToken: token });
  } catch (_: unknown) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    const decoded: DecodedToken = jwt.verify(
      token,
      jwtRefreshSecret,
    ) as DecodedToken;

    delete refreshTokens[decoded.id];

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (_: unknown) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};
