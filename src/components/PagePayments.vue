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
        <tr v-for="(paymentMethod, index) in paymentMethods" v-bind:key="paymentMethod.id" class="text-white" :class="[paymentMethod.is_default ? 'table-info' : 'table-success' ]">
          <th scope="col">{{paymentMethod.title}}</th>
          <td scope="col">{{paymentMethod.is_default}}</td>
          <td scope="col">
            <a @click.prevent="showDelete(paymentMethod, index)" href="#"><i class="text-white fas fa-trash-alt"></i></a>
            <a @click.prevent="showEdit(paymentMethod, index)" href="#"><i class="text-white fas fa-edit"></i></a>
          </td>
        </tr>
        </tbody>
      </table>

      <button type="button" class="btn btn-warning" @click="showAdd()">Add new</button>
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
  import MusicService from '@/services/MusicService'
  import Modal from '@/components/utils/Modal'
  import Vue from 'vue'

  export default {
    data () {
      return {
        paymentMethods: [],
        // states of modal dialog visible
        showModal: {
          edit: false,
          add: false,
          delete: false
        },
        // selected for edit payment
        selectedPayment: {
          data: {
            id: null,
            title: '',
            is_default: false
          },
          index: null
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.updateList()
      })
    },
    methods: {
      updateList () {
        MusicService.getPaymentMethods().then(data => {
          this.paymentMethods = data
        })
      },

      showEdit (paymentMethod, index) {
        // set selected payment
        this.selectedPayment = {
          data: Object.assign({}, paymentMethod),
          index: index
        }
        // show edit dialog
        this.showModal.edit = true
      },

      showAdd () {
        // set selected payment
        this.selectedPayment = {
          data: {
            title: '',
            is_default: false
          }
        }
        // show edit dialog
        this.showModal.add = true
      },

      showDelete (paymentMethod, index) {
        // set selected payment
        this.selectedPayment = {
          data: Object.assign({}, paymentMethod),
          index: index
        }
        // show edit dialog
        this.showModal.delete = true
      },

      removeDefault () {
        // set is_default = false for current default method
        this.paymentMethods.forEach(payment => {
          payment.is_default = false
        })
      },

      editPayment () {
        MusicService.editPaymentMethod(this.selectedPayment.data).then(() => {
          this.removeDefault()

          // set new value of paymentMethod into payment list
          Vue.set(this.paymentMethods, this.selectedPayment.index, this.selectedPayment.data)

          // hide dialog
          this.showModal.edit = false
        }, error => {
          console.log(error)
          alert(error)
        })
      },

      addPayment () {
        MusicService.addPaymentMethod(this.selectedPayment.data).then((data) => {
          this.removeDefault()

          // add new value of paymentMethod into payment list
          this.paymentMethods.push(data)

          // hide dialog
          this.showModal.add = false
        }, error => {
          console.log(error)
          alert(error)
        })
      },

      deletePayment () {
        MusicService.delPaymentMethod(this.selectedPayment.data.id).then(() => {
          // add new value of paymentMethod into payment list
          this.paymentMethods.splice(this.selectedPayment.index, 1)

          // hide dialog
          this.showModal.delete = false
        }, error => {
          console.log(error)
          alert(error)
        })
      }
    },
    components: {
      Modal
    }
  }
</script>
