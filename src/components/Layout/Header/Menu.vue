<script setup>
import MenuItem from '@components/Layout/Header/MenuItem.vue';
</script>

<template>
  <button class="flex flex-col justify-between h-8 w-8 p-2 bg-bismark-500 rounded lg:hidden" @click="toggle">
    <span class="sr-only">Open menu</span>
    <span v-for="index in 3" :key="index" class="line block w-full bg-white h-[2px] rounded-[1px]" />
  </button>
  <nav :class="['w-full lg:w-auto lg:flex', { 'hidden': !active, 'flex': active }]" id="site-navigation">
    <ul class="flex gap-6 flex-col w-full text-base text-bismark-500 font-heading lg:text-lg lg:w-auto lg:flex-row">
      <MenuItem v-for="link in links" :href="link.href" :text="link.text" />
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      active: false,
      links: [
        {
          href: '/stories',
          text: 'Stories'
        },
        {
          href: '/facets',
          text: 'Themes'
        },
        {
          href: '/people',
          text: 'People'
        },
        {
          href: '/partner-collections',
          text: 'Partner Collections'
        },
        {
          href: '/about',
          text: 'About ARGO'
        },
        {
          href: '/search',
          text: 'Search'
        }
      ]
    }
  },
  methods: {
    toggle: function () {
      this.active = !this.active;
    }
  },
}
</script>
