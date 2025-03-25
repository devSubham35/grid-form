import * as yup from "yup";

// Signup Validation schema using Yup
export const SignUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
  organization: yup.object().shape({
    name: yup
      .string()
      .required("Organization name is required")
      .min(2, "Organization name must be at least 2 characters"),
  }),
});

// Login Validation schema using Yup
export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});
