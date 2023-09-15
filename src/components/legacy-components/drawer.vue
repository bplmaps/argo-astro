<template>
	<details open v-if="ready" id="results-bar"  :class="['show',(drawer_results_visible.length) ? 'results-visible' : '']">
		<summary><span>{{drawer_results_visible.length}}</span> Result<template v-if="drawer_results_visible.length != 1">s</template></summary>
		<div id="results" :class="view_class+'-view'">
			<ul class="results-views">
				<li :class="['results-view-option',{'active' : view_class=='list'}]" id="list-view" @click="view_class = 'list'">List</li>
				<li :class="['results-view-option',{'active' : view_class=='thumbnail'}]"  id="thumbnail-view" @click="view_class = 'thumbnail'">Thumbnail</li>
			</ul>
			<template v-for="result, index in drawer_results_visible" >
			<a :href="'/maps/'+result" v-if="index < view_result_maximum" :key="index">
				<div v-if="maps[result]" class="result-image" :style="'background-image:url(https://bpldcassets.blob.core.windows.net/derivatives/images/'+maps[result].exemplary_image_ssi+'/image_thumbnail_300.jpg)'"></div>
				<div v-if="maps[result]" class="result-text">{{maps[result].title_info_primary_tsi}}</div>
			</a>
			</template>
			<a class="map-results-more" @click="view_result_maximum += 10" v-if="drawer_results_visible.length > view_result_maximum">Show more</a>
		</div>
	</details>
</template>

<script>
// import people from '~/data/people.json'

export default {
	name: 'Drawer',
	props: [
		'where_from',
		'drawer_results_visible',
		'maps',
	],
	asyncData ({ route }) {

		var person = '';
		var current_slug;

		return {
			person,
			current_slug,
		}

	},
	data() {
		return {
			ready: true,
			view_results_number: 10,
			view_class: 'list',
			view_result_maximum: 10,
			// current_slug: null,
		}
	},
	beforeMount() {
	},
	mounted(){
	},
	watch: {
		drawer_results_visible: function(status) {
			document.getElementById('results-bar').open = true;
		}
	},
	methods: {
		showMaps: function(which) {
			console.log('> showMaps', this.where_from, which);
			this.results_visible = which;
		},

	}
}
</script>
