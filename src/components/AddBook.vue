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
      persistent
      >
      <v-card title="Add New Book">
        <template v-slot:text>
          <v-form v-model="isValid" ref="bookForm" validate-on="blur">
            <v-text-field label="Title" v-model="title" variant="outlined" clearable :rules="[rules.required]"></v-text-field>
            <v-text-field label="Author" v-model="author" variant="outlined" clearable :rules="[rules.required]"></v-text-field>
            <v-text-field label="Artwork Url" v-model="artworkUrl" variant="outlined" clearable></v-text-field>
            <v-text-field label="Word Count" v-model="wordCount" variant="outlined" clearable :rules="[rules.required, rules.isNumber]"></v-text-field>
            <v-select label="Format" :items="formats" v-model="selectedFormat" item-title="formatType" single-line return-object variant="outlined" :rules="[rules.required]"></v-select>
            <v-text-field label="Start Date" v-model="dateStart" :value="simplifyDate(dateStart)" variant="outlined" clearable>
              <template #prepend>
                <v-btn color="surface-variant" icon="add" variant="flat" @click="this.dateDialogStart = true" />
              </template>
            </v-text-field>
            <v-checkbox v-model="useEndDate" label="Add End Date"></v-checkbox>
            <v-text-field label="End Date" v-model="dateEnd" :value="simplifyDate(dateEnd)" variant="outlined" clearable :disabled="!useEndDate">
              <template #prepend>
                <v-btn color="surface-variant" icon="add" variant="flat" @click="this.dateDialogEnd = true" />
              </template>
            </v-text-field>
          </v-form>
        </template>
        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Cancel"
            @click="onCancel"
          />
          <v-btn
            text="Save"
            @click="onConfirmSave"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dateDialogStart"
      max-width="375px"
      persistent
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
      persistent
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
  import bookApi from '@/bookApi'

  export default {
    data() {
      return {
        formats: [],
        selectedFormat: null,
        rules: {
          required: value => !!value || 'This Field is required',
          isNumber: value => {
            if (!value.trim()) return true;
            if (!isNaN(parseFloat(value)) && value >= -1) return true;
            return 'Number has to be a positive integer or -1';
          }
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
        isValid: false,
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

      onConfirmSave() {
        if (this.isValid) {
          this.postData();
        }
      },

      onCancel () {
        this.mainDialog = !this.mainDialog;
        this.$refs.bookForm.reset();
        this.dateStart = new Date();
        this.dateEnd = new Date();
      },

      postData() {
        bookApi.post('/books',
          {
            title: this.title,
            author: this.author,
            startDate: this.dateStart,
            endDate: (this.useEndDate ? this.dateEnd : null),
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

.v-input {
  padding-top: 10px;
}

</style>@/bookApi.js