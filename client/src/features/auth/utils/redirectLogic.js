export const getRedirectPath = (user) => {
  return user ? '/home' : '/welcome';
};
