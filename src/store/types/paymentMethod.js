/**
 * List payment methods through API Call
 */
export const PAYMENT_METHOD_LIST = 'PAYMENT_METHOD_LIST';

/**
 * Select the payment method in the payment method list
 */
export const PAYMENT_METHOD_SELECT = 'PAYMENT_METHOD_SELECT';

/**
 * Edit (Update) selected payment method information
 */
export const PAYMENT_METHOD_EDIT = 'PAYMENT_METHOD_EDIT';

/**
 * Save payment method
 */
export const PAYMENT_METHOD_SAVE = 'PAYMENT_METHOD_SAVE';

/**
 * Delete payment method
 */
export const PAYMENT_METHOD_DELETE = 'PAYMENT_METHOD_DELETE';

/**
 * Remove the "is_default" flag of the default method
 */
export const PAYMENT_METHOD_DISABLE_DEFAULT =
  'PAYMENT_METHOD_DISABLE_DEFAULT';

export default {
  PAYMENT_METHOD_LIST,
  PAYMENT_METHOD_SELECT,
  PAYMENT_METHOD_EDIT,
  PAYMENT_METHOD_DELETE,
  PAYMENT_METHOD_SAVE,
  PAYMENT_METHOD_DISABLE_DEFAULT,
};
