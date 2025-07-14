import { z } from 'zod';

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name regex to allow Unicode letters
const nameRegex = /^[\p{L} ]+$/u;

/**
 * Reusable Validators
 */
const emailValidator = z.string()
  .nonempty("Email is required")
  .regex(emailRegex, "Invalid email format");

const passwordValidator = z.string()
  .nonempty("Password is required")
  .min(6, "Password must be at least 6 characters long");

const nameValidator = z.string()
  .nonempty("Name is required")
  .min(3, "Name must be at least 3 characters long")
  .max(30, "Name must be at most 30 characters long")
  .regex(nameRegex, "Name must contain only letters and spaces");

/**
 * Register User Schema
 */
export const registerUserValidator = z.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator,
});

/**
 * Login User Schema
 */
export const loginUserValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
});
