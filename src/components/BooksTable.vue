<template>
  <v-card flat>
    <v-card-title class="align-center">
      Books
      <AddBook class="modal" :labels="headers"></AddBook>
    </v-card-title>
    <v-data-table :items="bookData" :headers="this.headers" :loading="loading">

      <template v-slot:item="{ item }">
        <tr>
          <td class="cover"><img :src="item.artwork ?? 'https://www.harborfreight.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_25592.jpg'" title="Cover" @click="this.goToImage(item.artworkUrl)" /></td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.formatType }}</td>
          <td>{{ item.wordCount.toLocaleString() }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
        </tr>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import AddBook from '@/components/AddBook.vue';
export default {

  components: {
    AddBook
  },

  data() {
    return {
      headers: [
        { title: '', value: 'artwork' },
        { title: 'Title', value: 'title', align: 'center' },
        { title: 'Author', value: 'author', align: 'center' },
        { title: 'Format', value: 'formatType', align: 'center' },
        { title: 'Word Count', value: 'wordCount', align: 'center' },
        { title: 'Start Date', value: 'startDate', align: 'center' },
        { title: 'End Date', value: 'endDate', align: 'center' }
      ]
    }
  },

  props: {
    bookData: Array
  },

  methods: {
    stringToDate(date) {
      const response = new Date(date);
      return response;
    },

    goToImage(url) {
      window.open(url, "_black");
    },
  },

  computed: {
    loading() {
      return !this.bookData;
    }
  }
}
</script>

<style>
.v-table {
  box-sizing: content-box;
  width: 100%;
  /* margin: 5px; */
}

.table-header {
  font-size: large;
  background-color: bisque;
}

td:not(:last-child) {
  border-right: 1px solid rgb(var(--v-theme-surface-light));
}

img {
  height: 50px;
  padding-top: 5px;
}

td.cover {
  margin: 0 !important;
  padding: 0 !important;
  width: 60px;
}

</style>