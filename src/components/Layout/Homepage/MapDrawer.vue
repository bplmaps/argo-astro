<template>
  <div class="relative z-40" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 pt-20">
      <div :class="['w-screen max-w-md transform transition ease-in-out duration-500', { 'translate-x-full': !$isDrawerOpen, 'pointer-events-auto translate-x-0': $isDrawerOpen }]">
        <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div class="sticky z-10 bg-white top-0 inset-x-0 py-6 px-4 sm:px-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-heading font-semibold leading-6 text-bismark-900" id="slide-over-title">{{ $drawerIdentifiers.length }} Results</h2>
              <div class="ml-3 flex h-7 items-center">
                <button @click="closeDrawer()" type="button" class="relative rounded-md bg-white text-bismark-700 hover:text-bismark-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="absolute -inset-2.5"></span>
                  <span class="sr-only">Close panel</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="relative flex items-stretch flex-col gap-6 flex-1 px-4 sm:px-6">
            <div class="flex gap-3 flex-col" v-for="id in $drawerIdentifiers" :key="id">
              <template v-if="maps[id]">
                <img v-if="maps[id].image" :src="maps[id].image" class="block w-full aspect-video object-cover object-center rounded" />
                <div>
                  <h3 v-if="maps[id].title" class="font-bold leading-tight text-bismark-900">
                    {{ maps[id].title }}
                  </h3>
                  <h4 v-if="maps[id].subtitle" class="italic text-gray-500">
                    {{ maps[id].subtitle }}
                  </h4>
                  <a :href="maps[id].link" class="button dark mt-1">See map</a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isDrawerOpen, drawerIdentifiers } from '../../../drawerStore';
import { useStore } from '@nanostores/vue';

const $isDrawerOpen = useStore(isDrawerOpen);
const $drawerIdentifiers = useStore(drawerIdentifiers);
</script>

<script>
export default {
  props: {
		maps: Object
	},
	methods: {
    closeDrawer() {
      isDrawerOpen.set(false)
		},
  }
};
</script>
