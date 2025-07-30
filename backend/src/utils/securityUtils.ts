import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_TOKEN ?? 'default_jwt_secret';

export const generateJwtToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '1h'
  })
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
}