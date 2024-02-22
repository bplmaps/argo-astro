<template>
  <h2 class="text-xl mb-1">Georeferencing</h2>
  <div class="flex flex-wrap gap-x-1 gap-y-2">
    <a :href=editorURL target="_blank" class="button arrow">Georeference this Map</a>
  </div>
</template>

<script>
export default {
  props: {
    manifestId: String
  },
  computed: {
    editorURL() {
      return `https://editor.allmaps.org/#/collection?url=${encodeURIComponent(this.manifestId)}`;
    }
  }
}
</script>