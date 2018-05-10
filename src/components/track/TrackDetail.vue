<template>
  <div class="container"
       v-if="track">
    <div class="card mb-3">
      <h3 class="card-header">{{track.title}}</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Author: {{track.author}}</li>
        <li class="list-group-item">Album: {{track.album}}</li>
        <li class="list-group-item">Price: {{track.price}}</li>
        <li class="list-group-item">Bought: {{track.is_bought}}</li>
      </ul>
      <div class="card-body">
        <p class="card-text">{{track.content}}</p>
      </div>

      <div class="card-footer">
        <button type="button"
                class="btn btn-info btn-lg btn-block"
                @click.prevent="like">
          <i class="fas fa-heart"
             v-if="track.is_liked"></i>
          <i class="far fa-heart"
             v-else></i>
          {{track.count_likes}}
        </button>
        <button type="button"
                class="btn btn-primary btn-lg btn-block"
                @click.prevent="$eventHub.$emit('select-payment-show')"
                v-if="!track.is_bought">
          Buy for {{track.price}} <i class="fas fa-dollar-sign"></i>
        </button>
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="close">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import {
  track as trackActions,
  common as commonActions,
} from '../../store/types/';
import { getters as trackGetters, } from '../../store/modules/track';

export default {
  props: [
    'track',
  ],
  /**
   * Subscribe on buy-event after mount
   */
  mounted() {
    this.$eventHub.$on('buy-track', this.buy);
  },
  /**
   * before destroy unsubscribe from all events
   */
  beforeDestroy() {
    this.$eventHub.$off('buy-track');
  },
  computed: {
    ...mapGetters(Object.keys(trackGetters)),
  },
  methods: {
    ...mapActions(trackActions),
    ...mapActions(commonActions),
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
    /**
     * Set like on track or delete like, if track already liked
     */
    like() {
      this.TRACK_LIKE().then((data) => {
        if (data.status === 201) {
          this.NOTIFICATION_SHOW_SUCCESS('You like this!');
        }

        if (data.status === 200) {
          this.NOTIFICATION_SHOW_SUCCESS('You unlike this!');
        }
      }).catch((error) => {
        this.NOTIFICATION_SHOW_DANGER(error.response.data.message);
      });
    },
  },
};
</script>
