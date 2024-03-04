<template>
  <li>
    <a :class="className ? className : 'hover:underline'" :href="href">{{ text }}</a>
  </li>
</template>

<script>
export default {
	name: 'NavItem',
  props: {
    className: String,
    href: String,
    text: String,
	},
}
</script>
