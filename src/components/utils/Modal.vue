<template>
  <transition name="modal">
    <div class="modal modal-mask"
         style="display: block">
      <div class="modal-dialog"
           role="document">
        <div class="modal-container modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="title">
                Title
              </slot>
            </h5>
            <button type="button"
                    class="close"
                    aria-label="Close"
                    @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <slot name="body">
                body of modal
              </slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="buttons"></slot>
            <button type="button"
                    class="btn btn-secondary"
                    @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

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
