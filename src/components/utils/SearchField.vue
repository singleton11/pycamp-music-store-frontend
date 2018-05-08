<template>
  <div class="row">
    <input class="form-control"
           placeholder="Enter text to search"
           type="text"
           :value="value"
           @input="setValue">
  </div>
</template>

<script>
export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      timer: null, // SetTimeout identifier
      wait: 300, // SetTimeout delay
    };
  },
  props: [
    'value',
  ],
  methods: {
    /**
     * Method for processing text input in the search field.
     *
     * @param $event - event (input)
     */
    setValue($event) {
      clearTimeout(this.timer);

      // wait until the user stops typing
      this.timer = setTimeout(() => {
        this.$emit('input', $event.target.value);
      }, this.wait);
    },
  },
};
</script>
