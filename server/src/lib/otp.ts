import crypto from "node:crypto";

import bcrypt from "bcrypt";

export const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const hashOtp = async (code: string) => {
  return bcrypt.hash(code, 10);
};

export const compareOtp = async (code: string, codeHash: string) => {
  return bcrypt.compare(code, codeHash);
};
