// Validates if password is strong enough

// Validates if code has been fully entered
export const isCodeComplete = (code) => code.length === 6;

/**
 * @param {object} formData - The form data to validate.
 * @returns {object} - An object with a success property and a message property.
 */
export const isDataValid = (formData) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const { first_name, last_name, email, password } = formData;
  if (!first_name || !last_name || !email || !password) {
    return {
      success: false,
      message: 'Please fill in all required fields.',
    };
  }

  if (!strongPasswordRegex.test(password)) {
    return {
      success: false,
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    };
  }
  return {
    success: true,
  };
};
