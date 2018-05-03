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
      <ul class="list-group list-group-flush">
        <li class="list-group-item"
            v-if="album.tracksInfo"
            v-for="track in album.tracksInfo"
            v-bind:key="track.id">
          {{track.title}}
        </li>
      </ul>

      <div class="card-footer">
        <button v-if="!album.is_bought"
                type="button"
                class="btn btn-primary btn-lg btn-block"
                @click.prevent="$emit('buy', album)">
          Buy for {{album.price}} <i class="fas fa-dollar-sign"></i>
        </button>
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { TRACK_GET_BY_ID, } from '../../store/types/track';

export default {
  props: [
    'album',
  ],
  /**
   * update tracks of album after mount component
   */
  mounted() {
    this.updateTrackInfo();
  },
  methods: {
    /**
     * update tracks of album
     */
    updateTrackInfo() {
      if (this.album.tracksInfo) {
        return;
      }
      this.$set(this.album, 'tracksInfo', []);
      this.album.tracks.forEach((trackId) => {
        this.$store.dispatch(TRACK_GET_BY_ID, trackId).then((track) => {
          this.album.tracksInfo.push(track);
        });
      });
    },
  },
  watch: {
    /**
     * follow the change of the album
     */
    album() {
      this.updateTrackInfo();
    },
  },
};
</script>
