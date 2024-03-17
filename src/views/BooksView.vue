<template>
    <div class="home">
        <BooksTable :book-data="bookData" />
    </div>
</template>
  
<script>
    // @ is an alias to /src
    import BooksTable from '@/components/BooksTable.vue'
    import bookApi from '@/api'

    export default {
        name: 'BooksView',
        components: {
            BooksTable
        },

        data() {
            return {
                bookData: []
            }
        },

        methods: {
            getData() {
                bookApi.get('/books')
                .then((response) => {
                    console.log(response);
                    this.bookData = response.data;
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('nothing');
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                });
            }
        },

        mounted() {
            this.getData();
        }
    }
</script>

<style>

.home {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1500px;
    min-width: 1000px;
    margin: auto;
    margin-top: 50px;
}

</style>