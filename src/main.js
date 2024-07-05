import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    defaultTheme: 'dark',
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
            md,
        },
    },
})

createApp(App).use(vuetify).use(router).mount('#app')
