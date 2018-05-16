<template>
  <div class="container">
    <h2>Transactions</h2>
    <table class="table table-hover"
           v-if="getTransactions">
      <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Sum</th>
        <th scope="col">Payment Method</th>
        <th scope="col">Item Type</th>
        <th scope="col">Item Name</th>
        <th scope="col">Item Id</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in getTransactions"
          :key="transaction.id"
          :class="[transaction.amount > 0 ? 'table-success' : 'table-danger']">
        <td scope="col">{{transaction.created}}</td>
        <td scope="col">{{transaction.amount}}</td>
        <td scope="col">
          <template v-if="transaction.payment_method">
            {{transaction.payment_method.title}}
          </template>
        </td>
        <td scope="col">{{transaction.purchase_type}}</td>
        <td scope="col">{{transaction.purchase_info}}</td>
        <td scope="col">{{transaction.purchase_id}}</td>
      </tr>
      </tbody>
    </table>
    <blockquote class="blockquote text-center"
                v-else>
      <p class="mb-0">Nothing to show</p>
    </blockquote>

    <Paginator :count-items=count
               :current-page=currentPage
               :maxPages=3
               @changePage="changePage"></Paginator>
  </div>
</template>

<script>
import { mapGetters, } from 'vuex';
import { getters as transactionGetters, } from '../store/modules/transaction';
import transactionService from '../services/transactionService';
import Paginator from '../components/utils/Paginator.vue';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      count: 1, // count of all transactions
      currentPage: 1,
    };
  },
  /**
   * update transaction list after mount component
   */
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(Object.keys(transactionGetters)),
  },
  methods: {
    /**
     * Get list of transactions on this page
     */
    getList() {
      transactionService.list({ page: this.currentPage, }).then((data) => {
        this.count = data;
      });
    },
    /**
     * Method for change the page of transactions
     *
     * @param page - transactions page
     */
    changePage(page) {
      this.currentPage = page;
      this.getList();
    },
  },
  components: {
    Paginator,
  },
};
</script>
