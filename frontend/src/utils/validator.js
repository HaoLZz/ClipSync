import Joi from 'joi-browser';

export const signUpFormSchema = {
  firstName: Joi.string().required().min(3).max(128).label('First Name'),
  lastName: Joi.string().required().min(3).max(128).label('Last Name'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(8).max(512).label('Password'),
};

export const signInFormSchema = {
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(5).max(512).label('Password'),
};

export const contactUsFormSchema = {
  fullName: Joi.string().required().min(3).max(128).label('Full Name'),
  email: Joi.string().email().required().label('Email'),
  subject: Joi.string().required().min(5).max(128).label('Subject'),
  message: Joi.string().required().min(5).max(512).label('Message'),
};

export function validateFormField(label, data, schema) {
  const toValidate = {
    [label]: data,
  };

  const fieldSchema = {
    [label]: schema[label],
  };
  const { value, error } = Joi.validate(toValidate, fieldSchema);
  return error ? error : value;
}

export function validateForm(data, schema) {
  const options = {
    abortEarly: false,
  };
  const { value, error } = Joi.validate(data, schema, options);
  return error ? error : value;
}
