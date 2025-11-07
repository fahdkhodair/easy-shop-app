import bcrypt from "bcryptjs";
export const createHash = async ({ plaintext = "", saltRound = Number(process.env.SALT_ROUND) || 10 }) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(plaintext, salt);
  return hash;
};
export const compareHash = async ({ plaintext = "", hashValue = "" } = {}) => {
  return await bcrypt.compare(plaintext, hashValue);
};