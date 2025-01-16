import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userResponse = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users/email/${email}`,
    );
    if (userResponse.data) {
      res.status(400).json({ message: 'User already exists' });
      return; // Prevent further execution
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await axios.post(
      `${process.env.USER_SERVICE_URL}/api/users`,
      {
        name,
        email,
        password: hashedPassword,
      },
    );

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser.data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown server error' });
    }
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
      return; // Prevent further execution
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return; // Prevent further execution
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown server error' });
    }
  }
};
