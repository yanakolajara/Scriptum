export const asyncHandler = (fn) => {
  return async (props) => {
    try {
      return await fn(props);
    } catch (error) {
      console.error('[Error:', error);
      return error;
    }
  };
};
