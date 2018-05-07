<template>
  <transition name="notification">
    <div class="notification alert alert-dismissible"
         v-show="getNotificationVisible"
         :class="'alert-' + getNotificationLevel">
      <a type="button"
         class="close"
         @click="NOTIFICATION_HIDE">&times;</a>
      <slot>{{getNotificationMessage}}</slot>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions, } from 'vuex';
import { common as commonActions, } from '../../store/types/';
import { getters as commonGetters, } from '../../store/modules/common';

export default {
  methods: {
    ...mapActions(commonActions),
  },
  computed: {
    ...mapGetters(Object.keys(commonGetters)),
  },
};
</script>

<style scoped>
  .notification {
    display: block;
    position: fixed;
    right: 10px;
    bottom: 10px;
    max-width: 20%;
  }
  .notification-enter-active {
    transition: transform 2s;
  }

  .notification-enter{
    transform: translateY(-100%);
  }

  .notification-enter-to {
    transform: translateY(0);
  }

</style>
