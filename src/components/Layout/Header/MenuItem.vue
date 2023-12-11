<template>
  <li>
    <a :href="href" class="hover:underline">{{ text }}</a>
  </li>
</template>

<script>
export default {
	name: 'NavItem',
  props: {
    href: String,
    text: String,
	},
}
</script>
