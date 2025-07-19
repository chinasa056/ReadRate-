import Joi from "joi";

// // Define your regex checks as constants
// const upperCaseCheck = /[A-Z]/;
// const lowerCaseCheck = /[a-z]/;
// const specialCharacterCheck = /[^a-zA-Z0-9]/;
// const digitCheck = /[0-9]/;

// export const passwordValidator = Joi.extend((joi) => ({
//   type: 'password',
//   base: joi.string(),
//   messages: {
//     'password.upperCase': 'Password must include at least one uppercase character',
//     'password.lowerCase': 'Password must include at least one lowercase character',
//     'password.specialCharacter': 'Password must include at least one special character',
//     'password.digit': 'Password must include at least one digit',
//   },
//   rules: {
//     upperCase: {
//       validate(value, helpers) {
//         if (!upperCaseCheck.test(value)) {
//           return helpers.error('password.upperCase');
//         }
//         return value;
//       },
//     },
//     lowerCase: {
//       validate(value, helpers) {
//         if (!lowerCaseCheck.test(value)) {
//           return helpers.error('password.lowerCase');
//         }
//         return value;
//       },
//     },
//     specialCharacter: {
//       validate(value, helpers) {
//         if (!specialCharacterCheck.test(value)) {
//           return helpers.error('password.specialCharacter');
//         }
//         return value;
//       },
//     },
//     digit: {
//       validate(value, helpers) {
//         if (!digitCheck.test(value)) {
//           return helpers.error('password.digit');
//         }
//         return value;
//       },
//     },
//   },
// }));

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
