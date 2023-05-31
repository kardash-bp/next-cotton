import bcrypt from 'bcryptjs'

export function hashPassword(pass: string) {
  try {
    const salt = bcrypt.genSaltSync(8);
    const passwordHash = bcrypt.hashSync(pass, salt);
    console.log({ salt, passwordHash });
    return passwordHash
  } catch (err: any) {
    console.log('password is not hashed');
  }
}