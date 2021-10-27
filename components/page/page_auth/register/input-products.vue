<template lang="pug">
.flex
    b-form-group(label='Produk Saya', v-slot='{ ariaDescribedby }')
        b-form-checkbox-group#checkbox-group-1(
            :value='res.products',
            v-model='res.prds',
            :options='res.options',
            :aria-describedby='ariaDescribedby',
            name='products',
            @change='res.Change'
        )
</template>
<script>
import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const { store } = useContext()
        const res = reactive({
            products: computed(() => store.state.auth.register.form.products),
            prds: [],
            options: [
                { text: 'EVOLENE', value: 'EVOLENE' },
                { text: 'BYT', value: 'BYT' },
                { text: 'SOP ALPHA', value: 'SOP_ALPHA' },
                { text: 'FLIMTY', value: 'FLIMTY' },
                { text: 'HERWELL', value: 'HERWELL' },
                { text: 'AROS', value: 'AROS' },
            ],
            Change: (c) => {
                store.dispatch('auth/register/SaveFormLogin', {
                    k: 'products',
                    v: c,
                })
                res.prds = c
            },
        })
        onMounted(() => {
            store.dispatch('auth/register/LoadSet').then(() => {
                setTimeout(() => {
                    res.prds = res.products
                }, 1000)
            })
        })
        return { res }
    },
    mounted() {},
})
</script>
