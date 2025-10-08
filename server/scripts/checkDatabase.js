import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Import models
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Internship from '../models/Internship.js';
import Application from '../models/Application.js';

const checkDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('\n-----------------------------------\n');

    // Check Admins
    const admins = await Admin.find({}).select('-password');
    console.log('👨‍💼 ADMINS:', admins.length);
    admins.forEach(admin => {
      console.log(`  - ${admin.email} (Created: ${admin.createdAt})`);
    });

    // Check Users (Students)
    const users = await User.find({}).select('-password');
    console.log('\n👨‍🎓 STUDENTS:', users.length);
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.programme}`);
    });

    // Check Companies
    const companies = await Company.find({}).select('-password');
    console.log('\n🏢 COMPANIES:', companies.length);
    companies.forEach(company => {
      console.log(`  - ${company.companyName} (${company.hrEmail}) - Status: ${company.status}`);
    });

    // Check Internships
    const internships = await Internship.find({});
    console.log('\n💼 INTERNSHIPS:', internships.length);
    internships.forEach(internship => {
      console.log(`  - ${internship.title} - Status: ${internship.status}`);
    });

    // Check Applications
    const applications = await Application.find({});
    console.log('\n📝 APPLICATIONS:', applications.length);
    applications.forEach(app => {
      console.log(`  - Status: ${app.status}`);
    });

    console.log('\n-----------------------------------');
    console.log('✅ Database check complete!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();

