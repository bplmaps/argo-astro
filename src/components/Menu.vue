<template>
  <a href="#" class="menu-toggle lg:hidden" @click="toggle">
    <span class="sr-only">Open menu</span>
    <span class="line" />
    <span class="line" />
    <span class="line" />
  </a>
  <nav :class="['site-navigation lg:flex', {'hidden' : !active, 'flex' : active}]" id="site-navigation">
    <ul class="main-nav flex flex-col lg:flex-row">
      <li class="nav-item">
        <a href="/stories">Read Stories</a>
      </li>
      <li class="nav-item">
        <a href="/facets">Explore by Theme</a>
      </li>
      <li class="nav-item">
        <a href="/about">About ARGO</a>
      </li>
      <li class="nav-item">
        <a href="/search">Search</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
	name: 'Menu',
  data () {
		return {
			active: false,
		}
	},
	methods: {
    toggle: function() {
      this.active = !this.active;
    }
	},
}
</script>
