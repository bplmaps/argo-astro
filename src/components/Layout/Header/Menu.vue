<script setup>
import MenuItem from '@components/Layout/Header/MenuItem.vue';
</script>

<template>
  <button class="flex flex-col justify-between h-8 w-10 p-2 rounded bg-bismark-500 lg:hidden" @click="toggle">
    <span class="sr-only">Open menu</span>
    <span v-for="index in 3" :key="index" class="line block w-full bg-white h-[2px] rounded-[1px]" />
  </button>
  <nav :class="['w-full lg:w-auto lg:flex', { 'hidden': !active, 'flex': active }]" id="site-navigation">
    <ul class="flex gap-5 flex-col w-full text-base text-bismark-950 font-semibold lg:gap-8 lg:text-lg lg:w-auto lg:flex-row lg:items-center">
      <MenuItem v-for="link in links" :className="link.className" :href="link.href" :text="link.text" />
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
          className: 'button w-full lg:w-auto',
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
