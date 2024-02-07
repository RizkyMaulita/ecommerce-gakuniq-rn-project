import bcrypt from "bcryptjs";

export const hashPassword = (plainPass: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainPass, salt);

  return hash;
};

export const comparePassword = (plainPass: string, hashedPass: string) => {
  return bcrypt.compareSync(plainPass, hashedPass);
};
