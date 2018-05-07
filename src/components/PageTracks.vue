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
                     @buy="buy"></TrackDetail>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import {
  track as trackActions,
  common as commonActions,
} from '../store/types/';
import { getters as trackGetters, } from '../store/modules/track';
import TracksTable from './track/TracksTable.vue';
import TrackDetail from './track/TrackDetail.vue';
import SearchField from './utils/SearchField.vue';

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
  },
  methods: {
    ...mapActions(trackActions),
    ...mapActions(commonActions),
    /**
     * Method of buying a track.
     */
    buy() {
      this.TRACK_BUY();
      this.NOTIFICATION_SHOW_SUCCESS('Purchase of the track was successful');
    },
  },
  components: {
    TracksTable,
    TrackDetail,
    SearchField,
  },
};
</script>
