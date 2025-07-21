import Joi from "joi";

const passwordRequirements =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).*$/;

export const passwordValidator = Joi.extend((joi) => ({
  type: "password",
  base: joi.string(),
  messages: {
    "password.validPassword":
      "Password must include at least one uppercase character, one lowercase character, one special character, and one digit",
  },
  validate(value, helpers): unknown {
    if (!passwordRequirements.test(value)) {
      return helpers.error("password.validPassword");
    }
    return value;
  },
}));
