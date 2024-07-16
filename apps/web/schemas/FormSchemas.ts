import { z } from "@repo/ui/components";

const registerFormSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not An Valid Email"),
  password: z.string().min(8, { message: "Minimum of 8 characters required" }),
});

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not An Valid Email"),
  password: z.string().min(8, { message: "Minimum of 8 characters required" }),
});

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not An Valid Email"),
});

const newPasswordSchema = z.object({
  password: z.string().min(8, { message: "Minimum of 8 characters required" }),
});

const addressFormSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "FullName is required" })
    .min(2, { message: "FullName must be at least 2 characters long" })
    .max(50, { message: "FullName must be at most 50 characters long" })
    .regex(/^[a-zA-Z\s]+$/, "Full name must contain only letters and spaces"),
  phoneNo: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .min(10, { message: "Phone Number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  pinCode: z
    .string()
    .min(1, { message: "PinCode is required" })
    .min(6, { message: "PinCode must be 6 digits only" })
    .regex(/^\d+$/, { message: "PinCode must contain only digits" }),
  houseNo: z.string().min(1, {
    message: "Flat, House no, Building, Company is required",
  }),
  street: z.string().min(1, {
    message: "Area, Street, Sector, Village is required",
  }),
  landmark: z.string().min(1, { message: "Landmark is required" }),
  city: z.string().min(1, { message: "Town/City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  addressType: z.enum(["HOME", "OFFICE", "PUBLIC"]),
  country: z.string().min(1, { message: "Country is required" }),
  countryCode: z.string().min(1, { message: "Country Code is required" }),
});

const reviewFormSchema = z.object({
  reviewTitle: z
    .string()
    .min(1, { message: "Review title is required" })
    .min(2, { message: "Review title must be at least 2 characters long" })
    .max(50, { message: "Review title must be at most 50 characters long" })
    .regex(/^[a-zA-Z\s]+$/, "Full name must contain only letters and spaces"),

  reviewDescription: z
    .string()
    .min(1, { message: "Review description is required" })
    .min(2, {
      message: "Review description must be at least 2 characters long",
    }),

  reviewStars: z
    .number()
    .min(1, { message: "Star is required" })
    .max(5, { message: "Maximum 5 stars are required" }),

  image: z.union([z.string(), z.instanceof(File)]).optional(),
});

const queryFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not An Valid Email"),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Minimum 10 Characters is required" }),
});

export {
  registerFormSchema,
  loginFormSchema,
  resetPasswordSchema,
  newPasswordSchema,
  addressFormSchema,
  reviewFormSchema,
  queryFormSchema,
};
