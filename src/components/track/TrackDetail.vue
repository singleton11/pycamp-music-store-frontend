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

      <div class="card-footer">
        <button type="button"
                class="btn btn-info btn-lg btn-block"
                @click.prevent="$emit('like')">
          <i class="fas fa-heart"
             v-if="track.is_liked"></i>
          <i class="far fa-heart"
             v-else></i>
          {{track.count_likes}}
        </button>
        <button type="button"
                class="btn btn-primary btn-lg btn-block"
                @click.prevent="$emit('buy')"
                v-if="!track.is_bought">
          Buy for {{track.price}} <i class="fas fa-dollar-sign"></i>
        </button>
        <button type="button"
                class="btn btn-danger btn-lg btn-block"
                @click.prevent="$emit('close')">
          Close
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
