<template>
  <form @submit.prevent="newQuery" class="mb-5">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative flex">
      <input v-model="queryString" type="search" id="default-search"
             @keyup="debouncedQuery" @change="debouncedQuery"
             class="block w-full p-4 text-xl text-gray-900 border border-gray-300 rounded-l bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
             autofocus placeholder="Search keywords, locations, people, institutions ..." required>
      <button type="submit" class="p-4 bg-bismark-500 text-white no-underline rounded-r transition-colors duration-200 ease-in-out flex items-center gap-2 hover:bg-bismark-700">
        <span>
          Search
        </span>
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </button>
    </div>
  </form>

  <section>
    <p v-if="queryString.length < 1" class="text-lg">Enter a search term</p>
    <p v-if="queryString.length > 0 && results < 1" class="text-lg">{{ loading ? 'Loading results...' : 'No results found.' }}</p>

    <div v-if="results.length > 0 " class="p-2 pl-6 text-lg border-l-8 flex items-center">
      <div>
        <span class="font-bold">{{ pages.total_count }}</span> results for search <span class="text-sm p-2 border rounded bg-clementine-50 text-gray-600 font-bold font-mono">{{ executedQueryString }}</span>
      </div>
      <div class="ml-4">
        Page <span class="font-bold">{{  pages.current_page }}</span> of <span class="font-bold">{{ pages.total_pages }}</span>
      <button v-if="pages.prev_page" @click="prevPage" class="button mx-2">Prev</button>
      <button v-if="pages.next_page" @click="nextPage" class="button mx-2">Next</button>
      </div>
    </div>


    <div v-if="!loading && results.length > 0" class="grid grid-cols-2 md:grid-cols-5 gap-4 my-5">
      
      <Card v-for="r in results" :key="r.id" :subtitle="r.admin_set_name_ssi"
            :title="r.title_info_primary_tsi" :link="{ href: `../maps/${r.id}`, text: 'See map' }"
            :image="`https://bpldcassets.blob.core.windows.net/derivatives/${r.exemplary_image_key_base_ss}/image_thumbnail_300.jpg`" />
    </div>

    <nav v-if="results.length > 0" class="flex justify-center gap-4">
      <button v-if="pages.prev_page" @click="prevPage" class="button">Prev</button>
      <button v-if="pages.next_page" @click="nextPage" class="button">Next</button>
    </nav>
  </section>
</template>

<script>

import debounce from "debounce";
import Card from '@components/Card.vue';

export default {
	name: 'SearchMain',
  components: {
    Card, 
  },
  data() {
    return {
      loading: false,
      queryString: '',
      executedQueryString: '',
      results: [],
      pages: {}
    }
  },
  methods: {
    resetPagination() {
      this.pages = {
        pages: {
          current_page: 1,
          'first_page?': true,
          'last_page?': true,
          limit_value: 0,
          next_page: null,
          offset_value: 0,
          prev_page: null,
          total_count: 0,
          total_pages: 0
        }
      }
    },
    getSearchUrl() {
      const url = "https://collections.leventhalmap.org/search";
      const params = {
        utf8: "✓",
        "f_inclusive[destination_site_ssim][]": "argo",
        format: "json",
        q: this.queryString,
        page: this.pages.current_page,
      };
      const searchParams = new URLSearchParams(params);
      return `${url}?${searchParams}`;
    },
    async performSearch(suppressLoading = false) {
      if (!suppressLoading) {
        this.loading = true;
      }

      if (this.queryString === "") {
        this.results = [];
        return;
      }

      if (this.queryString.length < 2) {
        return;
      }

      const searchUrl = this.getSearchUrl();
      const response = await (await fetch(searchUrl)).json();

      this.loading = false;
      this.executedQueryString = this.queryString;
      this.results = response.response.docs;
      this.pages = response.response.pages;
    },
    prevPage() {
      this.pages.current_page = this.pages.current_page === 1 ? 0 : this.pages.current_page - 1
      this.performSearch();
      window.scrollTo(0,0);
    },
    nextPage() {
      this.pages.current_page = this.pages.current_page + 1; 
      this.performSearch();
      window.scrollTo(0,0);
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);

    this.queryString = urlParams.has('q') ? urlParams.get('q') : '';
    this.resetPagination();
    this.performSearch();
  },
  created(){
    this.newQuery = () => {
      this.resetPagination();
      this.performSearch();
    };
    this.debouncedQuery = debounce(() => {
      this.resetPagination();
      this.performSearch({suppressLoading: true});
    }, 600);
  },
}
</script>