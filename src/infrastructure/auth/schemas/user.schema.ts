// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// You can define the possible roles using a TypeScript enum for better type safety.
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({
  // This option adds two fields to the schema: createdAt and updatedAt.
  // It's highly recommended for almost every schema.
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: [true, 'First name is required.'],
    trim: true, // Removes whitespace from both ends of a string
  })
  firstName: string;

  @Prop({
    required: [true, 'Last name is required.'],
    trim: true,
  })
  lastName: string;

  @Prop({
    required: [true, 'Email is required.'],
    unique: true, // Ensures no two users have the same email
    lowercase: true, // Converts email to lowercase before saving
    trim: true,
    // Basic regex for email validation
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required.'],
    // This is a security measure. By default, when you query for a user,
    // the password field will NOT be included in the results.
    // You must explicitly ask for it with .select('+password').
    select: false,
  })
  password: string; // Remember to hash this before saving!

  @Prop({
    type: String,
    enum: UserRole, // Restricts the value to the keys of the UserRole enum
    default: UserRole.USER, // If no role is provided, it defaults to 'user'
  })
  role: UserRole;
}

// This line creates the actual Mongoose schema from our decorated class.
export const UserSchema = SchemaFactory.createForClass(User);
