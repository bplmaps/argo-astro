<template>
  <div class="collection-card" v-if="loaded">
    <div class="result-image">
      <img
        :src="image"
        :alt="title"
        width="200"
        height="150"
      />
    </div>
    <div class="title-tags">
      <h3>{{title }}</h3>
      <div class="text">
        <p>{{ subtitle }}</p>
        <a class="button-like dark" :href="link.href">{{ link.text }}</a>
      </div>
    </div>
  </div>
  <div v-else />
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'CollectionCard',
	props: [
    'title',
    'subtitle',
    'link',
    'image',
  ],
  setup() {
    const loaded = ref(false);

    return {
      loaded
    };
  },
  mounted() {
    this.loaded = true;
  }
}
</script>
