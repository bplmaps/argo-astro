<template>
  <div
    class="card w-full bg-white border flex flex-col justify-start border-bismark-500 rounded-lg overflow-hidden"
    :class="className"
    v-if="loaded"
  >
    <div class="relative w-full aspect-video border-b border-bismark-500">
      <img
        :src="image"
        :alt="title"
        class="absolute z-10 inset-0 w-full h-full object-center object-cover"
      />
    </div>
    <div class="relative w-full flex flex-grow flex-col items-start p-3">
      <h3 v-if="title" class="text-lg leading-tight font-semibold overflow-hidden text-ellipsis line-clamp-2 mb-2">{{title }}</h3>
      <p v-if="subtitle" class="text-base leading-tight font-light overflow-hidden text-ellipsis line-clamp-3 mb-3">{{ subtitle }}</p>
      <a class="button dark mt-auto" :href="link.href">{{ link.text }}</a>
    </div>
  </div>
  <div v-else />
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'LazyCard',
	props: [
    'className',
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
