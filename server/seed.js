const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['it-admin', 'hr', 'employee'], default: 'employee' },
});

const User = mongoose.model('User', userSchema);

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://hr_db:Rohitsharma45@cluster0.bgulbw7.mongodb.net/';
    await mongoose.connect(uri, { family: 4 });
    console.log('Connected to MongoDB');

    const exists = await User.findOne({ email: 'itadmin' });
    if (exists) {
      console.log('IT-Admin already exists. Updating password just in case...');
      const salt = await bcrypt.genSalt(10);
      exists.password = await bcrypt.hash('itadmin@123', salt);
      await exists.save();
      console.log('Password updated.');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('itadmin@123', salt);
      await User.create({
        name: 'IT Admin',
        email: 'itadmin',
        password: hashedPassword,
        role: 'it-admin'
      });
      console.log('IT-Admin created successfully!');
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
