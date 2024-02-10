import { object, string, number, boolean, ref, ObjectSchema } from 'yup';

// define schema for validation here...
export const schema_PersonalInfo = object().shape({
    fullName: string().required("Your name is required"),
    address: string().required("Your address is required"),
});

export const schema_ContactInfo = object().shape({
    email: string().required("Please enter your email").email(),
    phone: number().required("Enter your phone number").typeError("Can only be numbers"),
});

export const schema_PasswordInfo = object().shape({
    password: string().required("Your password is Required")
      .min(4, "Must be greater than 4")
      .max(16, "Mustn't be longer than 16"),
    confirm_password: string()
      .label('confirm password')
      .required()
      .oneOf([ref('password'), ''], 'Passwords must match'),
});

export const schema_Agreement = object().shape({
    terms_and_conditions: boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
    // terms_and_conditions: boolean().required("You must agree to the terms"),
    // privacy_policy: boolean().required("You must agree our privacy policy"),
    privacy_policy: boolean()
    .required("The privacy policy must be accepted.")
    .oneOf([true], "The privacy policy must be accepted."),
});