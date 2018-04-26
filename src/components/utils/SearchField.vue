<template>
  <div class="row loader-in-input-parent">
    <input class="form-control" placeholder="Search" type="text" :value="value" @input="$emit('input', $event.target.value)">
    <div class="loader-in-input" v-show="loading"></div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        loading: true
      }
    },
    props: [
      'value'
    ],
    methods: {
      startLoader () {
        this.loading = true
      },
      stopLoader () {
        this.loading = false
      }
    }
  }
</script>

<style>
  .loader-in-input-parent{
    position: relative;
  }
  .loader-in-input {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #78c2ad; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
