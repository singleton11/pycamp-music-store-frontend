<template>
  <div class="container"
       v-if="album">
    <div class="card mb-3">
      <h3 class="card-header">{{album.title}}</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Author: {{album.author}}</li>
        <li class="list-group-item">Price: {{album.price}}</li>
        <li class="list-group-item">Bought: {{album.is_bought}}</li>
      </ul>

      <img class="card-img rounded-0"
           :src="album.image"
           alt="Card image cap"
           v-if="album.image">

      <TrackList :tracks="album.tracksInfo"></TrackList>

      <div class="card-footer">
        <button v-if="!album.is_bought"
                type="button"
                class="btn btn-primary btn-lg btn-block"
                @click.prevent="$eventHub.$emit('select-payment-show')">
          Buy for {{album.price}} <i class="fas fa-dollar-sign"></i>
        </button>
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="ALBUM_UNSELECT">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, } from 'vuex';
import TrackList from '../track/TracksList.vue';
import { ALBUM_GET_TRACKS, } from '../../store/types/album';
import {
  album as albumActions,
  common as commonActions,
} from '../../store/types/';
import store from '../../store';

export default {
  props: [
    'album',
  ],
  /**
   * update tracks of album after mount component and subscribe on buy-event
   */
  mounted() {
    this.$eventHub.$on('buy-album', this.buy);
    this.updateInfo();
  },
  /**
   * before destroy unsubscribe from all events
   */
  beforeDestroy() {
    this.$eventHub.$off('buy-album');
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
     * Method for calling action to update album tracks
     */
    updateInfo() {
      store.dispatch(ALBUM_GET_TRACKS);
    },
  },
  watch: {
    /**
     * follow the change of the album
     */
    album() {
      this.updateInfo();
    },
  },
  components: {
    TrackList,
  },
};
</script>
