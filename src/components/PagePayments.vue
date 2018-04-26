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
        <tr v-for="(paymentMethod, index) in paymentMethods" v-bind:key="paymentMethod.id" class="table-success text-white">
          <th scope="col">{{paymentMethod.title}}</th>
          <th scope="col">{{paymentMethod.is_default}}</th>
          <td scope="col">
            <!--a @click.prevent="" href="#"><i class="text-white fas fa-trash-alt"></i></a-->
            <a @click.prevent="showEdit(paymentMethod, index)" href="#"><i class="text-white fas fa-edit"></i></a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="showModal" @close="showModal=false">
      <template slot="title">
        Edit payment Method
      </template>
      <template slot="body">
        <label for="editTitle">Title</label>
        <input class="form-control" id="editTitle" aria-describedby="emailHelp" placeholder="Enter title of payment method" type="text" v-model="selectedPayment.data.title">
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" value="" v-model="selectedPayment.data.is_default" type="checkbox">
            set default?
          </label>
        </div>
      </template>
      <template slot="buttons">
        <button type="button" class="btn btn-primary" @click="saveEdit()">Save changes</button>
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
        // state of modal dialog visible
        showModal: false,
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
        this.showModal = true
      },
      saveEdit () {
        MusicService.editPaymentMethod(this.selectedPayment.data).then(() => {
          // set is_default = false for current default method
          this.paymentMethods.forEach(payment => {
            payment.is_default = false
          })

          // set new value of paymentMethod into payment list
          Vue.set(this.paymentMethods, this.selectedPayment.index, this.selectedPayment.data)

          // hide dialog
          this.showModal = false
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
