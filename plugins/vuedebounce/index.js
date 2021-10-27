import Vue from 'vue'
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce, {
    defaultTime: '700ms',
})
// v-debounce:300ms="myFunc"
