<template>
  <transition name="modal">
    <div class="modal modal-mask"
         style="display: block">
      <div class="modal-dialog"
           role="document">
        <div class="modal-container modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">
              Select payment method
            </h5>
            <button type="button"
                    class="close"
                    aria-label="Cancel"
                    @click="cancel">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <select v-model="selected"
                      title="Payment Method">
                <option v-for="paymentMethod in getPaymentMethods"
                        :value="paymentMethod.id"
                        :key="paymentMethod.id">
                  {{ paymentMethod.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-primary"
                    @click="confirm">Confirm</button>
            <button type="button"
                    class="btn btn-secondary"
                    @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapActions, mapGetters, } from 'vuex';
import { paymentMethod as paymentMethodActions, } from '../../store/types/';
import { getters as paymentMethodGetters, }
  from '../../store/modules/paymentMethod';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      selected: null,
    };
  },
  /**
   * update payment methods list after mount component
   * and select default method
   */
  mounted() {
    this.PAYMENT_METHOD_LIST().then(() => {
      this.selected = this.getPaymentMethods.find(item => item.is_default).id;
    });
  },
  computed: {
    ...mapGetters(Object.keys(paymentMethodGetters)),
  },
  methods: {
    ...mapActions(paymentMethodActions),
    /**
     * Save selected payment method
     */
    confirm() {
      const paymentMethod = this.getPaymentMethodById(this.selected);

      this.PAYMENT_METHOD_SELECT(paymentMethod);
      this.PAYMENT_METHOD_HIDE_SELECT_DIALOG();
      this.$emit('confirmSelect');
    },
    /**
     * Cancel select payment method
     */
    cancel() {
      this.PAYMENT_METHOD_HIDE_SELECT_DIALOG();
    },
  },
};
</script>

<style scoped>
  .modal-mask{
    transition: opacity .3s ease;
  }
  .modal-container {
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
