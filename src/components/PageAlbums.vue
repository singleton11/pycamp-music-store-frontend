<template>
  <div class="container">
    <SearchField v-model="searchText"></SearchField>
    <div class="row">
      <div class="col">
        <h2>Album List</h2>
        <AlbumsTable :albums="getAlbums"
                     @select="ALBUM_SELECT"></AlbumsTable>
      </div>

      <div class="col"
           v-if="getActiveAlbum">
        <h2>Album Info</h2>
        <AlbumDetail :album="getActiveAlbum"
                     @buy="buy"
                     @close="close"
        ></AlbumDetail>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { album as albumActions, } from '../store/types/';
import { getters as albumGetters, } from '../store/modules/album';
import AlbumsTable from './album/AlbumsTable.vue';
import AlbumDetail from './album/AlbumDetail.vue';
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
   * update albums list after mount component
   */
  mounted() {
    this.ALBUM_LIST();
  },
  computed: {
    ...mapGetters(Object.keys(albumGetters)),
  },
  methods: {
    ...mapActions(albumActions),
    /**
     * Event of buying a album.
     */
    buy() {
      this.ALBUM_BUY();
      this.NOTIFICATION_SHOW_SUCCESS('Purchase of the album was successful');
    },
    /**
     * Event of closing a album detail.
     */
    close() {
      this.ALBUM_UNSELECT(null);
    },
  },
  watch: {
    /**
     * Waiting for changes in the text in the search field,
     * after which we update the list of albums.
     */
    searchText() {
      this.ALBUM_SEARCH(this.searchText);
    },
  },
  components: {
    AlbumsTable,
    AlbumDetail,
    SearchField,
  },
};
</script>
