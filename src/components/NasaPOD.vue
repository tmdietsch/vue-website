<template>
  <v-card>
    <h1>{{ apod.title }}</h1>
    <img img :src="apod.url" title="Cover" />
  </v-card>
</template>

<script>

import nasaApi from '@/nasaApi';
export default {

  data() {
      return {
          apod: {}
      }
  },

  methods: {
      getPOD() {
        nasaApi.get('/planetary/apod')
        .then((response) => {
          this.apod = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
      },
  },

  mounted() {
    this.getPOD();
  }
}
</script>

<style>

img {
  max-width: 40%;
  height: auto;
  /* width: auto; */
}

</style>