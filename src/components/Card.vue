<template>
  <div
    class="card w-full bg-white shadow-lg rounded-xl flex flex-col justify-start overflow-hidden"
    :class="className"
    v-if="loaded"
  >
    <div v-if="image" class="relative w-full aspect-video border-b border-gray-100">
      <img
        :src="image"
        :alt="title"
        class="absolute z-10 inset-0 w-full h-full object-center object-cover"
      />
    </div>
    <header class="relative w-full flex flex-grow flex-col items-start px-3 pt-3 pb-4">
      <h3 v-if="title" class="text-lg leading-tight font-semibold overflow-hidden text-ellipsis text-bismark-900 line-clamp-2">{{title }}</h3>
      <p v-if="subtitle" class="text-base leading-tight font-light overflow-hidden text-ellipsis line-clamp-3">{{ subtitle }}</p>
    </header>
    <div class="px-3 pb-3">
      <a class="button dark mt-auto" :href="link.href">{{ link.text }}</a>
    </div>
  </div>
  <div v-else />
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'Card',
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
