<template>
  <h2 class="text-xl mb-1">Georeferencing</h2>
  <div class="flex flex-wrap gap-x-1 gap-y-2">
    <a v-if="existingGeoreference" :href=georeferencedURL target="_blank" class="button arrow">View this georeferenced map</a>
    <a :href=editorURL target="_blank" class="button arrow">{{ existingGeoreference ? 'Improve georeferencing on this map' : 'Georeference this Map' }}</a>
  </div>
</template>

<script>
export default {
  props: {
    manifestId: String
  },
  data() {
    return {
      existingGeoreference: false
    }
  },
  computed: {
    editorURL() {
      return `https://editor.allmaps.org/#/collection?url=${encodeURIComponent(this.manifestId)}`;
    },
    georeferencedURL() {
      return `https://viewer.allmaps.org/?url=${encodeURIComponent(this.manifestId)}`;
    }
  },
  mounted() {
    const app = this;
    const sha1Hash = app.$CryptoJS.SHA1(app.manifestId).toString();

    fetch(`https://annotations.allmaps.org/manifests/${sha1Hash.substring(0, 16)}`).then(function (response) {
      app.existingGeoreference = response.status === 200;
    });
  }
}
</script>
