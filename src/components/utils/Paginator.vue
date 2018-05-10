<template>
    <ul class="pagination pagination-lg">
      <li class="page-item"
          :class="{disabled: isFirstPage}">
        <a class="page-link"
           href="#"
           @click.prevent="changePage(1)">&laquo;</a>
      </li>
      <li class="page-item"
          v-for="pageNum in rangePages"
          :key="pageNum"
          :class="{active: pageNum === currentPage}">
        <a class="page-link"
           href="#"
           @click.prevent="changePage(pageNum)">{{ pageNum }}</a>
      </li>

      <li class="page-item"
          :class="{disabled: isLastPage}">
        <a class="page-link"
           href="#"
           @click.prevent="changePage(countPages)">&raquo;</a>
      </li>
    </ul>
</template>

<script>
export default {
  props: [
    'countItems',
    'itemsPerPage',
  ],
  /**
   * Define data model properties available for the component
   */
  data() {
    return {
      // current page
      currentPage: 1,
      // the number of pages for each second from the current
      pagesFromOneSide: 2,
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
     * @returns {Array}
     */
    rangePages() {
      const a = [];
      const start = Math.max(1, this.currentPage - this.pagesFromOneSide);
      const stop = Math.min(
        this.countPages,
        this.currentPage + this.pagesFromOneSide
      );

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
      this.currentPage = page;
      this.$emit('changePage', page);
    },
  },
};
</script>
