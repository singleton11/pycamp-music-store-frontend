import store from '../store';

/**
 * Router checker: If user is authenticated
 */
export const CheckAuthorization = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();

    return;
  }
  next({ name: 'login', });
};

/**
 * Router checker: If user is not authenticated
 */
export const CheckAuthorizationFalse = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();

    return;
  }
  next({ name: 'payments', });
};

/**
 * Router checker: If user is admin
 */
export const CheckAdmin = (to, from, next) => {
  if (store.getters.isAdmin) {
    next();

    return;
  }
  next({ name: 'home', });
};
