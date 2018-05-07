<template>
  <div class="form-group">
    <label class="form-control-label"
           for="input">
      <slot></slot></label>
    <input class="form-control"
           id="input"
           v-bind=$attrs
           :class="{'is-invalid': errors}"
           :value="value"
           @input="$emit('input', $event.target.value)">
    <div class="invalid-feedback"
         v-for="(error, index) in errors"
         :key="index">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'errors',
    'value',
  ],
  inheritAttrs: false,
};
</script>

<style scoped>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin,
  .form-signin {
    margin-bottom: 10px;
  }

  .form-signin {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }
</style>
