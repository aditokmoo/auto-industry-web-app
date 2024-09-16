import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide username'],
        minLength: [2, 'Username must contain at least 2 characters'],
        maxLenght: [15, 'Username cant be heigher then 15 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'worker', 'admin']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password cant be less then 6 characters'],
        maxLength: [25, 'Password cant be higher then 25 characters'],
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirmToken: {
        type: String,
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model('User', userSchema);

export default User;