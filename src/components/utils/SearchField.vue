<template>
  <div class="row loader-parent">
    <input class="form-control"
           placeholder="Search"
           type="text"
           :value="getValue"
           @input="setValue">
  </div>
</template>

<script>
import { SEARCH_FIELD_SET_TEXT, } from '../../store/types/common';

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
  computed: {
    /**
     * Method for getting search value
     */
    getValue() {
      return this.$store.getters.getSearchText;
    },
  },
  methods: {
    /**
     * Event triggered when entering text in the search field
     *
     * @param $event - event (input)
     */
    setValue($event) {
      clearTimeout(this.timer);

      // wait until the user stops typing
      this.timer = setTimeout(() => {
        this.$store.dispatch(SEARCH_FIELD_SET_TEXT, $event.target.value);
        this.$emit('change');
      }, this.wait);
    },
  },
};
</script>

<style scoped>
  .loader-parent{
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
