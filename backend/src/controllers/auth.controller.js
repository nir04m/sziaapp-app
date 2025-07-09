import User from '../models/User.js' // Adjust the path as necessary
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'Email, password, and full name are required.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists. Please use a different email' });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // Random index for profile picture
    const randomAvatar = `https://www.gravatar.com/avatar/0000000000000000000000000000000${idx}?d=mp&f=y`;

    const newUser = await User.create({
        fullName,
        email,
        password,
        profilePicture: randomAvatar,
    });

    //TODO: create the user in Stream Chat

    const token = jwt.sign({
        userId: newUser._id,
    },
    process.env.JWT_SECRET, {
        expiresIn: '10d',
    });

    res.cookie('jwt', token, { 
        httpOnly: true, // Helps prevent XSS attacks
        sameSite: 'strict', // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV === 'production',
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    res.status(201).json({ success:true, user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

export async function login(req, res) {
  res.send('Hello, SziaApp Backend! Login!');
}

export async function logout(req, res) {
  res.send('Hello, SziaApp Backend! Logout!');
}
