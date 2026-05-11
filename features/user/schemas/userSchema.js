const zod = require("zod");

const registerSchema = zod
  .object({
    userName: zod.coerce.string().trim(),
    email: zod.coerce.string().trim().lowercase().email(),
    password: zod.coerce.string(),
    passwordConfirmation: zod.coerce.string(),
  })
  .superRefine((obj, ctx) => {
    if (obj.password !== obj.passwordConfirmation) {
      ctx.addIssue({
        path: ["password"],
        message: "Senhas são diferentes",
      });
    }
  });

const loginSchema = zod.object({
  email: zod.coerce.string().trim().lowercase().email(),
  password: zod.coerce.string(),
});

const refreshSchema = zod.object({
  refreshToken: zod.string(),
});

module.exports = { registerSchema, loginSchema, refreshSchema };
