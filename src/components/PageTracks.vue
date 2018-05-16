<template>
  <div class="container">
    <SearchField v-model="searchText"></SearchField>
    <div class="row">
      <div class="col">
        <h2>Tracks List</h2>
        <TracksTable :tracks="getTracks"
                     @select="TRACK_SELECT"></TracksTable>
      </div>

      <div class="col-5"
           v-if="getActiveTrack">
        <h2>Tracks Info</h2>
        <TrackDetail :track="getActiveTrack"></TrackDetail>
      </div>
    </div>
    <SelectPayment @confirmSelect="$eventHub.$emit('buy-track')"/>
    <TrackContentModal :track="getActiveTrack"/>
    <Paginator :count-items=count
               :current-page=currentPage
               :maxPages=3
               @changePage="changePage"></Paginator>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { track as trackActions, } from '../store/types/';
import { getters as trackGetters, } from '../store/modules/track';
import TracksTable from './track/TracksTable.vue';
import TrackDetail from './track/TrackDetail.vue';
import TrackContentModal from './track/TrackContentModal.vue';
import SearchField from './utils/SearchField.vue';
import SelectPayment from './utils/SelectPayment.vue';
import Paginator from '../components/utils/Paginator.vue';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      searchText: '',
      count: 1, // count of all items
      currentPage: 1,
    };
  },
  /**
   * update track list after mount component
   */
  mounted() {
    this.getList(1);
  },
  computed: {
    ...mapGetters(Object.keys(trackGetters)),
  },
  methods: {
    ...mapActions(trackActions),
    /**
     * Get list of tracks on this page
     */
    getList(page) {
      this.TRACK_LIST({ search: this.searchText, page, })
        .then((data) => {
          this.count = data;
          this.currentPage = page;
        });
    },
    /**
     * Method for change the page
     *
     * @param page - current page
     */
    changePage(page) {
      this.getList(page);
    },
  },
  watch: {
    /**
     * Waiting for changes in the text in the search field,
     * after which we update the list of tracks
     */
    searchText() {
      this.getList(1);
    },
  },
  components: {
    TracksTable,
    TrackDetail,
    TrackContentModal,
    SearchField,
    SelectPayment,
    Paginator,
  },
};
</script>
