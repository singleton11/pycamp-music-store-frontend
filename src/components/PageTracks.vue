<template>
  <div class="container">
    <SearchField v-model="searchText"></SearchField>
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
import { track as trackActions, } from '../store/types/';
import { getters as trackGetters, } from '../store/modules/track';
import TracksTable from './track/TracksTable.vue';
import TrackDetail from './track/TrackDetail.vue';
import SearchField from './utils/SearchField.vue';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      searchText: '',
    };
  },
  /**
   * update track list after mount component
   */
  mounted() {
    this.TRACK_LIST();
  },
  computed: {
    ...mapGetters(Object.keys(trackGetters)),
  },
  methods: {
    ...mapActions(trackActions),
    /**
     * Method of buying a track.
     */
    buy() {
      this.TRACK_BUY();
      this.NOTIFICATION_SHOW_SUCCESS('Purchase of the track was successful');
    },
  },
  watch: {
    /**
     * Waiting for changes in the text in the search field,
     * after which we update the list of tracks.
     */
    searchText() {
      this.TRACK_SEARCH(this.searchText);
    },
  },
  components: {
    TracksTable,
    TrackDetail,
    SearchField,
  },
};
</script>
