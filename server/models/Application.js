import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Student reference is required']
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: [true, 'Internship reference is required']
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Interviewing', 'Offered', 'Rejected'],
    default: 'Applied'
  },
  coverLetter: {
    type: String,
    default: '',
    maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: '',
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Interviewing', 'Offered', 'Rejected']
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: ''
    }
  }],
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date,
    default: null
  },
  respondedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ student: 1, internship: 1 }, { unique: true });

// Indexes for efficient queries
applicationSchema.index({ student: 1, status: 1 });
applicationSchema.index({ internship: 1, status: 1 });
applicationSchema.index({ status: 1, appliedAt: -1 });

// Auto-populate student and internship info when querying
applicationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'student',
    select: 'name email studentId programme skills resumeUrl'
  }).populate({
    path: 'internship',
    select: 'title description skills company status',
    populate: {
      path: 'company',
      select: 'companyName website'
    }
  });
  next();
});

// Method to update status with history tracking
applicationSchema.methods.updateStatus = function(newStatus, notes = '') {
  this.status = newStatus;
  
  // Add to status history
  this.statusHistory.push({
    status: newStatus,
    changedAt: new Date(),
    notes: notes
  });
  
  // Update timestamps based on status
  if (newStatus === 'Under Review' && !this.reviewedAt) {
    this.reviewedAt = new Date();
  }
  
  if (['Offered', 'Rejected'].includes(newStatus) && !this.respondedAt) {
    this.respondedAt = new Date();
  }
  
  return this.save();
};

// Static method to get application statistics
applicationSchema.statics.getStatsByStudent = async function(studentId) {
  return this.aggregate([
    { $match: { student: mongoose.Types.ObjectId(studentId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

// Static method to get applications by internship
applicationSchema.statics.getByInternship = async function(internshipId) {
  return this.find({ internship: internshipId })
    .sort({ appliedAt: -1 })
    .populate('student', 'name email studentId programme skills resumeUrl');
};

const Application = mongoose.model('Application', applicationSchema);

export default Application;

