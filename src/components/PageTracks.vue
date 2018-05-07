<template>
  <div class="container">
    <SearchField @change="TRACK_SEARCH"></SearchField>
    <div class="row">
      <div class="col">
        <h2>Tracks List</h2>
        <TracksTable :tracks="getTracks"
                     @select="TRACK_SELECT"></TracksTable>
      </div>

      <div class="col"
           v-if="getActiveTrack">
        <h2>Tracks Info</h2>
        <TrackDetail :track="getActiveTrack"
                     @buy="PAYMENT_METHOD_SHOW_SELECT_DIALOG"
                     @close="close"></TrackDetail>
      </div>
    </div>
    <SelectPayment v-show="getSelectPaymentMethodVisible"
                   @confirmSelect="buy"></SelectPayment>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import {
  track as trackActions,
  paymentMethod as paymentMethodActions,
  common as commonActions,
} from '../store/types/';
import { getters as trackGetters, } from '../store/modules/track';
import { getters as paymentMethodGetters, }
  from '../store/modules/paymentMethod';
import TracksTable from './track/TracksTable.vue';
import TrackDetail from './track/TrackDetail.vue';
import SearchField from './utils/SearchField.vue';
import SelectPayment from './utils/SelectPayment.vue';

export default {
  /**
   * update track list after mount component
   */
  mounted() {
    this.SEARCH_FIELD_CLEAR();
    this.TRACK_LIST();
  },
  computed: {
    ...mapGetters(Object.keys(trackGetters)),
    ...mapGetters(Object.keys(paymentMethodGetters)),
  },
  methods: {
    ...mapActions(trackActions),
    ...mapActions(commonActions),
    ...mapActions(paymentMethodActions),
    /**
     * Buy track
     */
    buy() {
      this.TRACK_BUY().then(() => {
        this.NOTIFICATION_SHOW_SUCCESS('Purchase of the track was successful');
      }).catch((error) => {
        this.NOTIFICATION_SHOW_DANGER(error.response.data.message);
      });
    },
    /**
     * Event of closing a track detail
     */
    close() {
      this.TRACK_UNSELECT();
    },
  },
  components: {
    TracksTable,
    TrackDetail,
    SearchField,
    SelectPayment,
  },
};
</script>
