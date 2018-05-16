<template>
  <div class="container">
    <SearchField v-model="searchText"></SearchField>
    <div class="row">
      <div class="col">
        <h2>Album List</h2>
        <AlbumsTable :albums="getAlbums"
                     @select="ALBUM_SELECT"></AlbumsTable>
      </div>

      <div class="col-5"
           v-if="getActiveAlbum">
        <h2>Album Info</h2>
        <AlbumDetail :album="getActiveAlbum"></AlbumDetail>
      </div>
    </div>
    <SelectPayment @confirmSelect="$eventHub.$emit('buy-album')"/>
    <Paginator :count-items=count
               :current-page=currentPage
               :maxPages=3
               @changePage="changePage"></Paginator>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { album as albumActions, } from '../store/types/';
import { getters as albumGetters, } from '../store/modules/album';
import AlbumsTable from './album/AlbumsTable.vue';
import AlbumDetail from './album/AlbumDetail.vue';
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
   * update albums list after mount component
   */
  mounted() {
    this.getList(1);
  },
  computed: {
    ...mapGetters(Object.keys(albumGetters)),
  },
  methods: {
    ...mapActions(albumActions),
    /**
     * Get list of albums on this page
     */
    getList(page) {
      this.ALBUM_LIST({ search: this.searchText, page, })
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
     * after which we update the list of albums
     */
    searchText() {
      this.getList(1);
    },
  },
  components: {
    AlbumsTable,
    AlbumDetail,
    SearchField,
    SelectPayment,
    Paginator,
  },
};
</script>
