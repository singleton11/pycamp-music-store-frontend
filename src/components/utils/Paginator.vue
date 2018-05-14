<template>
    <ul class="pagination pagination-lg justify-content-center"
        v-show="countItems">
      <!-- First page -->
      <li class="page-item"
          :class="{disabled: isFirstPage}">
        <a class="page-link"
           href="#"
           @click.prevent="changePage(1)">&laquo;</a>
      </li>

      <!-- range of pages -->
      <li class="page-item"
          v-for="pageNum in rangePages"
          :key="pageNum"
          :class="{active: pageNum === currentPage}">
        <a class="page-link"
           href="#"
           @click.prevent="changePage(pageNum)">{{ pageNum }}</a>
      </li>

      <!-- Last page -->
      <li class="page-item"
          :class="{disabled: isLastPage}">
        <a class="page-link"
           href="#"
           @click.prevent="changePage(countPages)">&raquo;</a>
      </li>
    </ul>
</template>

<script>
import config from '../../config';

export default {
  props: [
    'countItems',
    'currentPage',
  ],
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      // the count of pages in range of pages
      maxPages: 5,
      itemsPerPage: config.paginator.itemsPerPage,
    };
  },
  computed: {
    /**
     * Get count of pages
     *
     * @returns {number}
     */
    countPages() {
      return Math.ceil(this.countItems / this.itemsPerPage);
    },
    /**
     * Check, that current page is first page
     *
     * @returns {boolean}
     */
    isFirstPage() {
      return this.currentPage === 1;
    },
    /**
     * Check, that current page is last page
     *
     * @returns {boolean}
     */
    isLastPage() {
      return this.currentPage === this.countPages;
    },
    /**
     * Get range of pages
     *
     * @returns {Array} - range of pages, for example if maxPages=5 then
     *   page 1/10: [1, 2, 3, 4, 5]
     *   page 6/10: [4, 5, 6, 7, 8]
     *   page 9/10: [6, 7, 8, 9, 10]
     */
    rangePages() {
      let start = this.currentPage - Math.floor((this.maxPages - 1) / 2);
      let stop = this.currentPage + Math.floor(this.maxPages / 2);

      if (start < 1) {
        stop -= (start - 1);
        start = 1;
      }

      if (stop > this.countPages) {
        start -= (stop - this.countPages);
        stop = this.countPages;
      }
      start = Math.max(1, start);

      const a = [];

      for (let i = start; i <= stop; i++) {
        a.push(i);
      }

      return a;
    },
  },
  methods: {
    /**
     * Method for change page and emit event to parent
     *
     * @param page - selected page
     */
    changePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>
