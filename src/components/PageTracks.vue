<template>
  <div class="container">
    <!--SearchField v-model="searchText" ref="search"></SearchField-->
    <div class="row">
      <div class="col">
        <h2>Tracks List</h2>
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Author</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="track in getTracks"
              v-bind:key="track.id"
              :class="[track.is_bought ? 'bg-primary text-white' : 'bg-light']">
            <td scope="col">{{track.author}}</td>
            <th scope="col">
              <a href="#"
                 :class="{'text-white': track.is_bought}">
                {{track.title}}
              </a>
            </th>
            <td scope="col">{{track.price}}</td>
            <td scope="col">
              <a href="#"
                 v-if="!track.is_bought"
                 @click.prevent="buy(track)">
                <i class="fas fa-dollar-sign"></i> Buy
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="col"
           v-if="false">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import { track as trackActions, } from '../store/types/';
import { getters as trackGetters, }
  from '../store/modules/track';

export default {
  /**
   * Define data model properties available for the component
   */
  data() {
    return {};
  },
  /**
   * update payment method list after mount component
   */
  mounted() {
    this.TRACK_LIST();
  },
  computed: {
    ...mapGetters(Object.keys(trackGetters)),
  },
  methods: {
    ...mapActions(trackActions),
    buy(track) {
      this.TRACK_SELECT(track);
      this.TRACK_BUY();
    },
  },
};
</script>
