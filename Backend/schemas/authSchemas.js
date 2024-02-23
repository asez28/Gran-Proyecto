const { z } = require("zod");

const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
  name: z.string({
    required_error: "Name is required",
  }),
  lastName: z.string({
    required_error: "LastName is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  phoneNumber: z
    .string({
      required_error: "phoneNumber is required",
    })
    .min(10, {
      message: "Phone Number invalid, must be at least 10 numbers",
    }),
});

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).optional(),
    username: z.string().optional(),
    password: z.string({
      required_error: "Password is required",
    }).min(6, {
      message: "Password must be at least 6 characters",
    }),
  });
  
  const emailOrUsername = z.string({
    required_error: "Email or username is required",
  });
  
  loginSchema.emailOrUsername = emailOrUsername.or(z.string());
  
  module.exports = loginSchema;

module.exports = {
    registerSchema,
    loginSchema,
  };