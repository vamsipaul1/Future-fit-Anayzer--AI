import mongoose, { Schema, Document } from 'mongoose';

export interface IUserLogin extends Document {
  email: string;
  name: string;
  image?: string;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserLoginSchema = new Schema<IUserLogin>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  paid: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const UserLogin = mongoose.models.UserLogin || mongoose.model<IUserLogin>('UserLogin', UserLoginSchema);
