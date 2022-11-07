import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import 'vuetify/styles'
// import './css/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
        mdi,
      }
  },
})


const app = createApp(App)
app.use(store)
app.use(vuetify)
app.mount('#app')

