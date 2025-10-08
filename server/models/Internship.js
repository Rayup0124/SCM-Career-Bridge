import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Internship title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  skills: {
    type: [String],
    default: [],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one skill is required'
    }
  },
  targetedProgrammes: {
    type: [String],
    default: [],
    enum: [
      'Bachelor of Computing Science',
      'Bachelor of Arts in Industrial Design',
      'Bachelor of Arts (Hons.) in Creative Digital Media',
      'Bachelor of Mobile Game Development'
    ],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one target programme is required'
    }
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company reference is required']
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  location: {
    type: String,
    default: '',
    trim: true
  },
  duration: {
    type: String,
    default: '',
    trim: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  salary: {
    type: String,
    default: '',
    trim: true
  },
  startDate: {
    type: Date,
    default: null
  },
  applicationDeadline: {
    type: Date,
    default: null
  },
  numberOfPositions: {
    type: Number,
    default: 1,
    min: [1, 'Number of positions must be at least 1']
  },
  applicationCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
internshipSchema.index({ company: 1, status: 1 });
internshipSchema.index({ status: 1, createdAt: -1 });
internshipSchema.index({ skills: 1 });
internshipSchema.index({ targetedProgrammes: 1 });

// Virtual populate for applications
internshipSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'internship'
});

// Auto-populate company info when querying
internshipSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'company',
    select: 'companyName website description'
  });
  next();
});

// Method to check if internship is still accepting applications
internshipSchema.methods.isAcceptingApplications = function() {
  if (this.status !== 'Open') {
    return false;
  }
  
  if (this.applicationDeadline && this.applicationDeadline < new Date()) {
    return false;
  }
  
  return true;
};

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;

