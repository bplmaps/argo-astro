<template>

	<footer data-embed="Footer:Footer">
		<div class="site-logo">
			<a href="/" class="placeholder-logo"><span class="sr-only">ARGO Home</span></a>
		</div>
		<nav id="site_map" class="site-map" data-embed="Footer: sitemap nav">
			<ul>
				<li class="nav-item" data-id="11">
					<p class="link-like">Explore by Stories</p>
					<div class="nav-dropdown">
						<ul class='dropdown-content'>
							<li class="item-dropdown "><a href="/story-forgotten-theater/">The Forgotten Theater of the American Revolution</a></li>
							<li class="item-dropdown "><a href="/explore/exhibits-0/">Mapping the Revolution</a></li>
							<li class="item-dropdown "><a href="/explore/exhibits-1/">George Washington’s Maps</a></li>
						</ul>
					</div>
				</li>
				<li class="nav-item" data-id="12">
					<p class="link-like">Explore by Themes</p>
					<div class="nav-dropdown">
						<ul class='dropdown-content'>
							<li class="item-dropdown "><a href="/people/">People</a></li>
							<li class="item-dropdown "><a href="/empires-and-nations/">Nations & Empires</a></li>
							<li class="item-dropdown "><a href="/explore/4features-2/">Cartouches</a></li>
							<li class="item-dropdown "><a href="/explore/4features-5/">Animals</a></li>
						</ul>
					</div>
				</li>
				<li class="nav-item" data-id="7">
					<p class="link-like">About ARGO</p>
					<div class="nav-dropdown">
						<ul class='dropdown-content'>
							<li class="item-dropdown "><a href="/about/">About ARGO</a></li>
							<li class="item-dropdown "><a href="/about-partner-institutions/">Partner Institutions</a></li>
						</ul>
					</div>
				</li>
				<li class="nav-item" data-id="5">
					<a href="/educators/">For Educators</a>
				</li>
			</ul>
			<!--<form class="header-search">
				<div class="search">
					<label for="header-search" class="sr-only">Search</label>
					<input placeholder="Search" id="header-search" type="text"><button><em class="fa fa-search"></em></button>
				</div>
			</form>-->
			<div class="social-icons">
				<!--
				<a href="#"><div class="icon"></div></a>
				<a href="#"><div class="icon"></div></a>
				<a href="#"><div class="icon"></div></a>
				-->
			</div>
		</nav>
		<div class="footer-logos">
			<div class="logo"><img src="/images/NBLMEC_logo.png" alt="Levanthal Map Center Logo" /></div>
			<div class="logo"><img src="/images/gwpl_logo.png" alt="George Washington Presidential Library Logo" /></div>
			<div class="logo"><img src="/images/nhprc-logo-l.jpg" alt="National Archives Logo" /></div>
		</div>
		<div class="footer-credits" data-embed="Footer: above credits">
			<div class="credit" data-embed="Footer: credits left area"><p>
				<a href="/maps/" style="text-decoration:none;font-size: 14px;font-weight: 400;">All Maps</a> &nbsp;
				<a href="/explore/" style="text-decoration:none;font-size: 14px;font-weight: 400;">All Themes</a> &nbsp;
				<a href="/search/" style="text-decoration:none;font-size: 14px;font-weight: 400;">Advanced Search</a>
			</p></div>
			<div class="credit" data-embed="Footer: credits right area"><p>Exhibition Site by <a href="/">Byte</a></p></div>
		</div>

    	<Drawer :drawer_results_visible="drawer_results_visible" :maps="maps" />

	</footer>

</template>

<script>
import Drawer from "./drawer.vue";

export default {
	components: {
		Drawer,
	},
	data () {
		return {
			maps: [],
			drawer_results_visible: [],
		}
	},
	beforeMount() {
	},
    mounted() {
		// callable from anywhere via emit
		this.$root.$on('open_drawer', (maps, which_maps) => {
			this.openDrawer(maps, which_maps);
		})
	},
	methods: {
		openDrawer: function(maps, which_maps) {
			// console.log('> footer openDrawer', which_maps);
			this.maps = maps;
			this.drawer_results_visible = which_maps;
		},
	},
}
</script>
