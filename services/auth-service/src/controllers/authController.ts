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
    console.log('[REGISTER]: Received request to register user:', email);

    // Check if the user exists
    const userCheckUrl = `${process.env.USER_SERVICE_URL}/api/users?email=${email}`;
    console.log('[REGISTER]: Checking user existence at:', userCheckUrl);

    try {
      const userResponse = await axios.get(userCheckUrl);

      if (userResponse.data) {
        console.log('[REGISTER]: User already exists:', userResponse.data);
        res.status(400).json({ message: 'User already exists' });
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('[REGISTER]: User not found, proceeding with registration');
      } else {
        console.error('[REGISTER]: Error checking user existence:', error);
        throw error;
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[REGISTER]: Password hashed successfully');

    // Create the user via user-service
    const createUserUrl = `${process.env.USER_SERVICE_URL}/api/users`;
    console.log('[REGISTER]: Creating user at:', createUserUrl);

    const newUserResponse = await axios.post(createUserUrl, {
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = newUserResponse.data.user;

    console.log('[REGISTER]: User created successfully:', createdUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: createdUser, // Ensure correct user data is passed back
    });
  } catch (error: unknown) {
    console.error('[REGISTER]: Error during registration:', error);
    res.status(500).json({
      message: 'Server error during registration',
      error: (error as Error).message || 'Unknown error',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Retrieve user details from user-service (include password for login)
    const userResponse = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users?email=${email}&includePassword=true`,
    );
    const user = userResponse.data;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    refreshTokens[user.id] = refreshToken;

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error: unknown) {
    console.error('[LOGIN]: Error during login:', error);
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
