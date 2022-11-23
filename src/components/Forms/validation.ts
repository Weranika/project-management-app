const REQUIRED_FIELD = 'Required to fill';

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Login cannot contain Russian letters';
    }

    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Password must be longer than 6 characters';
    }

    return true;
  },
};

export const nameValidation = {
  required: REQUIRED_FIELD,
};
