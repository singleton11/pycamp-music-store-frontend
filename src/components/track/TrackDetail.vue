<template>
  <div class="container"
       v-if="track">
    <div class="card mb-3">
      <h3 class="card-header">{{track.title}}</h3>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Author: {{track.author}}</li>
        <li class="list-group-item">Album: {{track.album}}</li>
        <li class="list-group-item">Price: {{track.price}}</li>
        <li class="list-group-item">Bought: {{track.is_bought}}</li>
      </ul>
      <div class="card-body">
        <p class="card-text">{{track.content}}</p>
      </div>

      <div class="card-footer"
           v-if="!track.is_bought">
        <button type="button"
                class="btn btn-primary btn-lg btn-block"
                @click.prevent="$emit('buy', track)">
          Buy for {{track.price}} <i class="fas fa-dollar-sign"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'track',
  ],
};
</script>
