<script setup>

import debounce from "debounce";
import { ref, watch } from "vue";

import Card from '@components/Card.vue';

let queryString = ref("");
let results = ref([]);

const getSearchUrl = () => {
    const url = "https://collections.leventhalmap.org/search";
    const params = {
        utf8: "✓",
        "f_inclusive[destination_site_ssim][]": "argo",
        format: "json",
        q: queryString.value,
    };
    const searchParams = new URLSearchParams(params);
    return `${url}?${searchParams}`;
};

const performSearch = debounce(async () => {
    if (queryString.value === "") {
        results.value = [];
        return;
    }
    if (queryString.value.length < 2) {
        return;
    }

    const searchUrl = getSearchUrl();
    const response = await (await fetch(searchUrl)).json();

    results.value = response.response.docs;
}, 600);

watch(queryString, () => {
    performSearch();
});

</script>

<template>
    <form>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input v-model="queryString" type="search" id="default-search"
                class="block w-full p-4 ps-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search keywords, locations, people, institutions ..." required>
            <button type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>

    <section>
        <div class="grid grid-cols-5 gap-4 mt-6">
        <Card
            client:visible
            v-for="r in results"
            :key="r.id"
            :subtitle="r.admin_set_name_ssi"
            :title="r.title_info_primary_tsi"
            :link="{href: `../maps/${r.id}`, text: 'See map'}"
            :image="`https://bpldcassets.blob.core.windows.net/derivatives/${r.exemplary_image_key_base_ss}/image_thumbnail_300.jpg`"
          />
        </div>

    </section></template>

