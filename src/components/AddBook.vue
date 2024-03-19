<template>
  <div>
    <v-btn
      color="surface-variant"
      text="+"
      variant="flat"
      @click="mainDialog = true"
    />
    <v-dialog 
      v-model="mainDialog"
      max-width="500"
      >
      <v-card title="Add New Book">
        <template v-slot:text>
          <v-text-field label="Title" v-model="title" variant="outlined" clearable :rules="[rules.required]"></v-text-field>
          <v-text-field label="Author" v-model="author" variant="outlined" clearable :rules="[rules.required]"></v-text-field>
          <v-text-field label="Artwork Url" v-model="artworkUrl" variant="outlined" clearable></v-text-field>
          <v-text-field label="Word Count" v-model="wordCount" variant="outlined" clearable :rules="[rules.required]"></v-text-field>
          <v-select label="Format" :items="formats" v-model="selectedFormat" item-title="type" single-line return-object variant="outlined" :rules="[rules.required]"></v-select>
          <v-text-field label="Start Date" v-model="dateStart" :value="simplifyDate(dateStart)" variant="outlined" clearable>
            <template #prepend>
              <v-btn color="surface-variant" text="+" variant="flat" @click="this.dateDialogStart = true" />
            </template>
          </v-text-field>
          <v-checkbox v-model="useEndDate" label="Add End Date"></v-checkbox>
          <v-text-field label="End Date" v-model="dateEnd" :value="simplifyDate(dateEnd)" variant="outlined" clearable :disabled="!useEndDate">
            <template #prepend>
              <v-btn color="surface-variant" text="+" variant="flat" @click="this.dateDialogEnd = true" />
            </template>
          </v-text-field>
        </template>
        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Cancel"
            @click="mainDialog = !mainDialog"
          />
          <v-btn
            text="Save"
            @click="postData()"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dateDialogStart"
      max-width="375px"
      >
      <v-card>
        <template v-slot:text>
          <v-date-picker v-model="dateStart" title="" header="Select Start Date" scrollable></v-date-picker>
        </template>
        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Done"
            @click="this.dateDialogStart = !this.dateDialogStart"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dateDialogEnd"
      max-width="375px"
      >
      <v-card>
        <template v-slot:text>
          <v-date-picker v-model="dateEnd" title="" header="Select End Date" scrollable></v-date-picker>
        </template>
        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Done"
            @click="this.dateDialogEnd = !this.dateDialogEnd"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import bookApi from '@/api'

  export default {
    data() {
      return {
        formats: [],
        selectedFormat: null,
        rules: {
          required: value => !!value || 'Field is required'
        },
        dateStart: new Date(),
        dateEnd: new Date(),
        mainDialog: false,
        dateDialogStart: false,
        dateDialogEnd: false,
        useEndDate: false,
        title: null,
        author: null,
        artworkUrl: null,
        wordCount: null,
      }
    },

    props: {
      labels: Array,
    },

    methods: {
      simplifyDate(date) {
        return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
      },

      getFormatData() {
        bookApi.get('/formats')
        .then((response) => {
          this.formats = response.data;
        })
      },

      postData() {
        bookApi.post('/books',
          {
            title: this.title,
            author: this.author,
            startDate: '2024-03-18',
            endDate: (this.useEndDate ? this.endDate : null),
            artworkUrl: this.artworkUrl,
            formatId: this.selectedFormat.id,
            wordCount: parseInt(this.wordCount),
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(() => {
          this.mainDialog = false;
        })
      }
    },

    mounted() {
      this.getFormatData();
    }
  }
</script>

<style>

.v-btn__content {
  font-weight: bolder;
}

</style>