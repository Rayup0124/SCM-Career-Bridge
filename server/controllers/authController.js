import User from '../models/User.js';
import Company from '../models/Company.js';
import Admin from '../models/Admin.js';
import { generateToken } from '../utils/jwt.js';

/**
 * Register a new student
 * POST /api/auth/register/student
 */
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, studentId, programme, skills } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !studentId || !programme) {
      return res.status(400).json({
        error: 'Please provide all required fields: name, email, password, studentId, programme'
      });
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }
    
    // Check if student ID already exists
    const existingStudentId = await User.findOne({ studentId });
    if (existingStudentId) {
      return res.status(400).json({
        error: 'Student ID already registered'
      });
    }
    
    // Create new student user
    const user = new User({
      name,
      email,
      password,
      studentId,
      programme,
      skills: skills || []
    });
    
    await user.save();
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      role: 'student'
    });
    
    res.status(201).json({
      message: 'Student registered successfully',
      token,
      user: user.toSafeObject()
    });
  } catch (error) {
    console.error('Register student error:', error);
    res.status(500).json({
      error: 'Error registering student',
      details: error.message
    });
  }
};

/**
 * Register a new company
 * POST /api/auth/register/company
 */
export const registerCompany = async (req, res) => {
  try {
    const { companyName, hrEmail, password, description, website } = req.body;
    
    // Validate required fields
    if (!companyName || !hrEmail || !password) {
      return res.status(400).json({
        error: 'Please provide all required fields: companyName, hrEmail, password'
      });
    }
    
    // Check if email already exists
    const existingCompany = await Company.findOne({ hrEmail });
    if (existingCompany) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }
    
    // Create new company (status will be 'Pending' by default)
    const company = new Company({
      companyName,
      hrEmail,
      password,
      description: description || '',
      website: website || ''
    });
    
    await company.save();
    
    // Generate JWT token
    const token = generateToken({
      userId: company._id,
      role: 'company'
    });
    
    res.status(201).json({
      message: 'Company registered successfully. Your account is pending approval.',
      token,
      company: company.toSafeObject()
    });
  } catch (error) {
    console.error('Register company error:', error);
    res.status(500).json({
      error: 'Error registering company',
      details: error.message
    });
  }
};

/**
 * Login for all user types (Student, Company, Admin)
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Please provide email and password'
      });
    }
    
    // Try to find user in all collections
    let user = null;
    let role = null;
    
    // Check if user is a student
    user = await User.findOne({ email }).select('+password');
    if (user) {
      role = 'student';
    }
    
    // Check if user is a company
    if (!user) {
      user = await Company.findOne({ hrEmail: email }).select('+password');
      if (user) {
        role = 'company';
      }
    }
    
    // Check if user is an admin
    if (!user) {
      user = await Admin.findOne({ email }).select('+password');
      if (user) {
        role = 'admin';
      }
    }
    
    // If no user found
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }
    
    // Update last login for admin
    if (role === 'admin') {
      user.lastLogin = new Date();
      await user.save();
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      role: role
    });
    
    res.json({
      message: 'Login successful',
      token,
      role,
      user: user.toSafeObject()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Error logging in',
      details: error.message
    });
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    res.json({
      user: req.user.toSafeObject(),
      role: req.userRole
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching user profile',
      details: error.message
    });
  }
};

