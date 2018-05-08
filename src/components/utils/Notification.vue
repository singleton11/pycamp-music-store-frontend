<template>
  <transition name="notification">
    <div class="notification alert alert-dismissible"
         :class="'alert-' + level">
      <a class="close"
         @click="$emit('close')">&times;</a>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: [
    'level',
  ],
};
</script>

<style scoped>
  .notification {
    display: block;
    position: absolute;
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
