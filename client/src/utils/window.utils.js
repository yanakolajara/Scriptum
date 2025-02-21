export const getPath = () => window.location.pathname;

// Stores data in local storage
export const storeDataInLS = (data) => {
  window.localStorage.setItem('user', JSON.stringify(data));
};
