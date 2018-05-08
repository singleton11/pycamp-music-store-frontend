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
      </tr>
      </tbody>
    </table>
    <blockquote class="blockquote text-center"
                v-else>
      <p class="mb-0">Nothing to show</p>
    </blockquote>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { transaction as transactionActions, } from '../store/types/';
import { getters as transactionGetters, } from '../store/modules/transaction';

export default {
  /**
   * update transaction list after mount component
   */
  mounted() {
    this.TRANSACTION_LIST();
  },
  computed: {
    ...mapGetters(Object.keys(transactionGetters)),
  },
  methods: {
    ...mapActions(transactionActions),
  },
};
</script>
