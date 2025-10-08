import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Admin from '../models/Admin.js';

// Load environment variables
dotenv.config();

/**
 * Script to create initial admin account
 * Run: node scripts/createAdmin.js
 */
const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@uts.edu.au';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('✅ Admin account already exists');
      console.log(`📧 Email: ${adminEmail}`);
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      name: 'System Administrator',
      email: adminEmail,
      password: adminPassword,
      permissions: ['all']
    });

    await admin.save();

    console.log('✅ Admin account created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

