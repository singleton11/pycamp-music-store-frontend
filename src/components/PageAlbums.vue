<template>
  <div class="container">
    <SearchField @change="ALBUM_SEARCH"></SearchField>
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
                     @buy="$eventHub.$emit('select-payment-show')"
                     @close="close"
        ></AlbumDetail>
      </div>
    </div>
    <SelectPayment @confirmSelect="buy"></SelectPayment>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import {
  album as albumActions,
  common as commonActions,
} from '../store/types/';
import { getters as albumGetters, } from '../store/modules/album';
import AlbumsTable from './album/AlbumsTable.vue';
import AlbumDetail from './album/AlbumDetail.vue';
import SearchField from './utils/SearchField.vue';
import SelectPayment from './utils/SelectPayment.vue';

export default {
  /**
   * update albums list after mount component
   */
  mounted() {
    this.SEARCH_FIELD_CLEAR();
    this.ALBUM_LIST();
  },
  computed: {
    ...mapGetters(Object.keys(albumGetters)),
  },
  methods: {
    ...mapActions(albumActions),
    ...mapActions(commonActions),
    /**
     * Buy selected album
     */
    buy() {
      this.ALBUM_BUY().then(() => {
        this.NOTIFICATION_SHOW_SUCCESS('Purchase of the album was successful');
      }).catch((error) => {
        this.NOTIFICATION_SHOW_DANGER(error.response.data.message);
      });
    },
    /**
     * Method for closing a album detail
     */
    close() {
      this.ALBUM_UNSELECT();
    },
  },
  components: {
    AlbumsTable,
    AlbumDetail,
    SearchField,
    SelectPayment,
  },
};
</script>
