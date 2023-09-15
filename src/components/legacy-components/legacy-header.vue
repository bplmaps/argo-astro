<template>

			<a href="#" class="ham-menu" @click="open_mobile_nav = !open_mobile_nav">
				<span class="sr-only">Open menu</span>
				<span class="line"></span><span class="line"></span><span class="line"></span>
			</a>
			<nav class="site-navigation" id="site_navigation">
				<!-- TODO: reorganize this so that the styles are better controlled + there is a default shown image -->
				<div class="image-placeholder">

				</div>
				<div class="nav-wrapper">
					<ul class="main-nav">
						<li :class="['nav-item',{'toggled': open_mobile_sub_current=='themes'}]">
							<a @click.prevent="open_mobile_nav=!open_mobile_nav">Explore by Stories</a>
							<ul class="dropdown-content">
								<li class="nav-dropdown">
									<a href="/story-forgotten-theater/">
										<div class="dropdown-image" style="background-image: url('/images/stories_forgotten_theater.jpg');"></div>
										The Forgotten Theater of the American Revolution
									</a>
								</li>
								<li class="nav-dropdown">
									<a href="/explore/exhibits-0/">
										<div class="dropdown-image" style="background-image: url('/content/campaigns/facets_29_image_compress_100.jpg');"></div>
										Mapping the Revolution
									</a>
								</li>
								<li class="nav-dropdown">
									<a href="/explore/exhibits-1/">
										<div class="dropdown-image" style="background-image: url('/content/campaigns/facets_28_image_compress_100.jpg');"></div>
										George Washington’s Maps
									</a>
								</li>
							</ul>
						</li>

						<li :class="['nav-item',{'toggled': open_mobile_sub_current=='facets'}]">
							<a @click.prevent="open_mobile_nav=!open_mobile_nav">Explore by Themes</a>
							<!--<button class="item-arrow" type='button' @click="open_mobile_sub_current = (open_mobile_sub_current!='facets') ? 'facets' : ''" aria-label="dropdown">12</button>-->
							<ul class="dropdown-content">
								<li class="nav-dropdown">
									<a href="/people/">
										<div class="dropdown-image" style="background-image: url('/images/explore_by_people.jpg');"></div>
										People
									</a>
								</li>
								<li class="nav-dropdown">
									<a href="/empires-and-nations/">
										<div class="dropdown-image" style="background-image: url('/images/explore_by_empirenation.jpg');"></div>
										Empires &amp; Nations
									</a>
								</li>
								<li class="nav-dropdown">
									<a href="/explore/4features-2/">
										<div class="dropdown-image" style="background-image: url('/images/explore_by_cartouche.jpg');"></div>
										Cartouches
									</a>
								</li>
								<li class="nav-dropdown">
									<a href="/explore/4features-5/">
										<div class="dropdown-image" style="background-image: url('/images/explore_by_animals.jpg');"></div>
										Animals
									</a>
								</li>
							</ul>
						</li>

						<li class="nav-item ">
							<a @click.prevent="open_mobile_nav=!open_mobile_nav">About ARGO</a>
							<ul class="dropdown-content">
								<li class="nav-dropdown">
									<a href="/about/">
										<div class="dropdown-image" style="background-image: url('/images/explore_by_animals.jpg');"></div>
										About ARGO
									</a>
								</li>
								<li class="nav-dropdown">
									<a href="/about-partner-institutions/">
										<div class="dropdown-image" style="background-image: url('/images/explore_by_animals.jpg');"></div>
										Partner Institutions
									</a>
								</li>
							</ul>
						</li>

						<li class="nav-item ">
							<a href="/educators/">For Educators</a>
						</li>
					</ul>
					<form class="header-search" @submit.prevent="searchSubmitFromHeader">
						<div>
							<label for="header-search" class="sr-only">Search</label>
							<input placeholder="Search" v-model="search_from_header" id="header-search" type="text"><button type="submit" class="button-like primary"><em class="fa fa-search"></em></button>
						</div>
						<!-- <a href="/search/">Advanced Search</a> -->
					</form>
				</div>
			</nav>

</template>




<script>
export default {
	data () {
		return {
			open_mobile_nav: false,
			open_mobile_sub_current: null,
			search_from_header: '',
			betaWarningVisibility: false,
		}
	},
	beforeMount() {
		this.$nextTick(() => {
			if (window.location.pathname == '/') this.betaWarningVisibility = true;
		});
	},
	methods: {
		searchSubmitFromHeader: function(event) {
			console.log('> searchSubmitFromHeader', this.search_from_header);
			document.location.href='/search/?q='+this.search_from_header;
		},
	},
}
</script>
