<template>
  <transition name="modal"
              v-if="visible">
    <div class="modal modal-mask"
         style="display: block">
      <div class="modal-dialog"
           role="document">
        <div class="modal-container modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">
              {{ track.title }}
            </h5>
            <button type="button"
                    class="close"
                    aria-label="Close"
                    @click="visible = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-for="(paragraph, index) in track.content.split('\n')"
               :key="index">{{paragraph}}</p>
            <p class="text-danger"
               v-if="!track.is_bought">
              For seen full version buy the track
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import trackService from '../../services/trackService';

export default {
  props: [
    'track',
  ],
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      visible: false,
    };
  },
  /**
   * Subscribe on event after mount
   */
  mounted() {
    this.$eventHub.$on('listen-track', () => {
      this.visible = true;
      // We send information about the fact that the user listened to the track
      trackService.listen({ track: this.track, });
    });
  },
  /**
   * before destroy unsubscribe from all events
   */
  beforeDestroy() {
    this.$eventHub.$off('listen-track');
  },
};
</script>

<style scoped>
  .modal-mask{
    transition: opacity .3s ease;
  }
  .modal-container {
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
