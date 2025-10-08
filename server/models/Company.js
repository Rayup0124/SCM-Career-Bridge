import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  hrEmail: {
    type: String,
    required: [true, 'HR email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  description: {
    type: String,
    default: '',
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  website: {
    type: String,
    default: '',
    match: [
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      'Please provide a valid website URL'
    ]
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  role: {
    type: String,
    enum: ['company'],
    default: 'company'
  },
  approvedAt: {
    type: Date,
    default: null
  },
  rejectedAt: {
    type: Date,
    default: null
  },
  rejectionReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Hash password before saving
companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update approval/rejection timestamps
companySchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'Approved') {
      this.approvedAt = new Date();
      this.rejectedAt = null;
      this.rejectionReason = '';
    } else if (this.status === 'Rejected') {
      this.rejectedAt = new Date();
      this.approvedAt = null;
    }
  }
  next();
});

// Method to compare password for login
companySchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to get company data without sensitive information
companySchema.methods.toSafeObject = function() {
  const companyObject = this.toObject();
  delete companyObject.password;
  return companyObject;
};

const Company = mongoose.model('Company', companySchema);

export default Company;

