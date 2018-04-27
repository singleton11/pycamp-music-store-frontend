<template>
  <div class="container">
    <h1>Payment Methods</h1>
    <div class="row">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Default?</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(paymentMethod) in getPaymentMethods" v-bind:key="paymentMethod.id" class="text-white" :class="[paymentMethod.is_default ? 'table-info' : 'table-success' ]">
          <th scope="col">{{paymentMethod.title}}</th>
          <td scope="col">{{paymentMethod.is_default}}</td>
          <td scope="col">
            <a @click.prevent="paymentMethodSelectToDelete(paymentMethod)" href="#"><i class="text-white fas fa-trash-alt"></i></a>
            <a @click.prevent="paymentMethodSelectToEdit(paymentMethod, 'edit')" href="#"><i class="text-white fas fa-edit"></i></a>
          </td>
        </tr>
        </tbody>
      </table>

      <button type="button" class="btn btn-warning" @click="paymentMethodCreate()">Add new</button>
    </div>

    <!-- Modal dialog for edit -->
    <Modal v-if="showModal.edit" @close="showModal.edit=false">
      <template slot="title" v-if="!tmpItem.id">
        Add new payment Method
      </template>
      <template slot="title" v-else>
        Edit payment Method
      </template>

      <template slot="body">
        <label for="addTitle">Title</label>
        <input v-model="tmpItem.title"
               class="form-control"
               id="addTitle"
               placeholder="Enter title of payment method"
               type="text">
        <div class="form-check">
          <label class="form-check-label">
            <input v-model="tmpItem.is_default" class="form-check-input" type="checkbox">
            set default?
          </label>
        </div>
      </template>

      <template slot="buttons">
          <button v-if="!tmpItem.id" type="button" class="btn btn-primary" @click="paymentMethodSave()">Add</button>
          <button v-else type="button" class="btn btn-primary" @click="paymentMethodSave()">Save</button>
      </template>
    </Modal>

    <!-- Modal dialog for delete -->
    <Modal v-if="showModal.delete" @close="showModal.delete=false">
      <template slot="title">
        Сonfirmation
      </template>
      <template slot="body">
        Are you sure you want to delete the selected payment method?
      </template>
      <template slot="buttons">
        <button type="button" class="btn btn-primary" @click="paymentMethodDelete()">Delete</button>
      </template>
    </Modal>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Modal from './utils/Modal.vue';
  import { paymentMethod as paymentMethodActions } from '../store/types/';
  import {
    getters as paymentMethodGetters,
  } from '../store/modules/paymentMethod';
  import { NOTIFICATION_SHOW } from '../store/types/common';

  export default {
    data() {
      return {
        // states of modal dialog visible
        showModal: {
          edit: false,
          delete: false,
        },
        tmpItem: {},
      };
    },
    mounted() {
      this.PAYMENT_METHOD_LIST();
    },
    computed: {
      ...mapGetters(Object.keys(paymentMethodGetters)),
    },
    methods: {
      ...mapActions(paymentMethodActions),

      paymentMethodSelectToEdit(paymentMethod) {
        this.PAYMENT_METHOD_SELECT(paymentMethod);
        this.tmpItem = { ...this.getActivePaymentMethod };
        this.showModal.edit = true;
      },
      paymentMethodSelectToDelete(paymentMethod) {
        this.PAYMENT_METHOD_SELECT(paymentMethod);
        this.showModal.delete = true;
      },
      paymentMethodCreate() {
        this.tmpItem = { ...this.getNewPaymentMethod };
        this.showModal.edit = true;
      },
      paymentMethodSave() {
        this.showModal.edit = false;
        this.PAYMENT_METHOD_SAVE(this.tmpItem);
        this.$store.dispatch(NOTIFICATION_SHOW, 'Success!');
      },
      paymentMethodDelete() {
        this.PAYMENT_METHOD_DELETE(this.getActivePaymentMethod).then(() => {
          this.showModal.delete = false;
          this.$store.dispatch(NOTIFICATION_SHOW, 'Payment was been deleted!');
        })
      },
    },
    components: {
      Modal,
    },
  };
</script>
