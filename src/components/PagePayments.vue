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
            <a @click.prevent="paymentMethodSelect(paymentMethod, 'delete')" href="#"><i class="text-white fas fa-trash-alt"></i></a>
            <a @click.prevent="paymentMethodSelect(paymentMethod, 'edit')" href="#"><i class="text-white fas fa-edit"></i></a>
          </td>
        </tr>
        </tbody>
      </table>

      <button type="button" class="btn btn-warning" @click="paymentMethodSelect(null, 'add')">Add new</button>
    </div>

    <!-- Modal dialog for edit -->
    <Modal v-if="showModal.edit" @close="showModal.edit=false">
      <template slot="title">
        Edit payment Method
      </template>
      <template slot="body">
        <label for="editTitle">Title</label>
        <input class="form-control" id="editTitle" placeholder="Enter title of payment method" type="text" v-model="selectedPayment.data.title">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" v-model="selectedPayment.data.is_default" type="checkbox">
            set default?
          </label>
        </div>
      </template>
      <template slot="buttons">
        <button type="button" class="btn btn-primary" @click="editPayment()">Save changes</button>
      </template>
    </Modal>

    <!-- Modal dialog for add -->
    <Modal v-if="showModal.add" @close="showModal.add=false">
      <template slot="title">
        Add new payment Method
      </template>
      <template slot="body">
        <label for="addTitle">Title</label>
        <input class="form-control" id="addTitle" placeholder="Enter title of payment method" type="text" v-model="selectedPayment.data.title">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" value="" v-model="selectedPayment.data.is_default" type="checkbox">
            set default?
          </label>
        </div>
      </template>
      <template slot="buttons">
        <button type="button" class="btn btn-primary" @click="addPayment()">Add</button>
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
        <button type="button" class="btn btn-primary" @click="deletePayment()">Delete</button>
      </template>
    </Modal>

  </div>
</template>

<script>
  import Modal from '@/components/utils/Modal'
  import { mapActions, mapGetters } from 'vuex'
  import { paymentMethod as paymentMethodActions } from '@/store/types/'
  import {getters as paymentMethodGetters} from '@/store/modules/paymentMethod'

  export default {
    data () {
      return {
        // states of modal dialog visible
        showModal: {
          edit: false,
          add: false,
          delete: false
        }
      }
    },
    computed: {
      ...mapGetters(Object.keys(paymentMethodGetters))
    },
    methods: {
      ...mapActions(paymentMethodActions),
      paymentMethodSelect (paymentMethod, action) {
        const { $store } = this

        $store.dispatch(paymentMethodActions.PAYMENT_METHOD_SELECT, paymentMethod)
        this.showModal[action] = true
      }

      // removeDefault () {
      //   // set is_default = false for current default method
      //   this.paymentMethods.forEach(payment => {
      //     payment.is_default = false
      //   })
      // },
    },
    components: {
      Modal
    }
  }
</script>
