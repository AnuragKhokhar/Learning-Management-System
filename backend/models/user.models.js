import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema({
     fullName:{
        type:'String',
        required: [true, 'Name is Required'],
        minLength: [5, 'Name must be of atleast 5 character'],
        maxLength: [50, 'Name should be less than 50 characters'],
        lowercase: true,
        trim: true
     },

     email:{
        type: 'String',
        required: [true, 'Email is required'],
        lowercase:true,
        trim: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please fill in a valid email address'
        ]

     },

     password:{
        type: 'String',
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be atleast 8 characters'],
        select: false
     },

     avatar:{
        public_id: {
            type: 'String'
        },
        secure_url:{
            type: 'String'
        }
     },

     role:{
        type: 'String',
        enum:['USER', 'ADMIN'],
        default:'USER'
     },

     forgetPasswordToken:String,
     forgetPasswordExpiry: Date,
     subscription:{
      id:String,
      status:String
     }
},{
    timestamps:true
});

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
       return next();
   }
   try {
       this.password = await bcrypt.hash(this.password, 10);
       return next();
   } catch (error) {
       return next(error);
   }
});

userSchema.methods = {
   generateJWTToken : async function(){
      try {
         return await jwt.sign(
             { id: this._id, email: this.email, subscription: this.subscription, role: this.role },
             process.env.SECRET,
             { expiresIn: '24h' }
         );
     } catch (error) {
         throw new Error('Failed to generate JWT token');
     }
   },


   generatePasswordResetToken: async function (){
      try {
         const resetToken = crypto.randomBytes(20).toString('hex');
         this.forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
         this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 mins from now
         return resetToken;
     } catch (error) {
         throw new Error('Failed to generate password reset token');
     }
   }
}

const User = model('users', userSchema);

export default User;