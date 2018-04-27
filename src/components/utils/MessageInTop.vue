<template>
  <transition name="modal">
    <div class="notification alert alert-dismissible alert-secondary">
      <div class="modal-container">
        <button type="button"
                class="close"
                @click="$emit('close')">&times;</button>
        <slot>
        </slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .notification {
    display: block;
    position: absolute;
    right: 10px;
    bottom: 10px;
    max-width: 20%;
    transition: opacity .3s ease;
  }

  .modal-container {
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
