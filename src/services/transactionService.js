import transactionApi from '../api/transaction';
import store from '../store';
import { TRANSACTION_LIST, } from '../store/types/transaction';

export default {
  /**
   * List transactions on this page
   *
   * @param {int} page - page for display
   * @returns {Promise} - count of all transactions
   */
  list({ page = 1, }) {
    return transactionApi.list({ page, }).then((response) => {
      store.commit(TRANSACTION_LIST, response.data.results);

      return response.data.count;
    });
  },
};
