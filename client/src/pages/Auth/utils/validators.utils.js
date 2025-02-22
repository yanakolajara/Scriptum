// Validates if password is strong enough
export const isPasswordValid = (password) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

// Validates if code has been fully entered
export const isCodeComplete = (code) => code.length === 6;
