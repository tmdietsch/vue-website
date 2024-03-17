<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-center table-header" v-for="header in headers" :key="header">
                    <b>{{ header }}</b>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in bookData" :key="item.id">
                <td class="cover"><img :src="item.artworkUrl" /></td>
                <td>{{ item.title }}</td>
                <td>{{ item.author }}</td>
                <td>{{ item.format }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.end }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                '',
                'Name',
                'Author',
                'Format',
                'Start Time',
                'End Time',
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
        }
    },
}
</script>

<style>
.v-table {
    background-color: rgb(174, 214, 174);
    box-sizing: content-box;
    width: 100%;
    border: solid rgb(255, 0, 0) 1px;
    margin: 5px;
}

.table-header {
    font-size: large;
    background-color: bisque;
}

td:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
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