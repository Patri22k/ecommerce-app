import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_TOKEN ?? 'default_jwt_secret';

export const generateJwtToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: '1h'
  })
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
}