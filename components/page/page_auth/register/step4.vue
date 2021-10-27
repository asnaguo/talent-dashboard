<template lang="pug">
.flex
    .flex
        .alert.alert-info Terimakasih telah mendaftar di AIMI
    .flex.mt-4
        b-button(variant='light', @click='res.Step(1)') Kembali
</template>
<script>
import {
    defineComponent,
    computed,
    reactive,
    useContext,
    onMounted,
} from '@nuxtjs/composition-api'
import InputForm from './input-form'
import InputProducts from './input-products'
import InputMarketplace from './input-marketplace'

export default defineComponent({
    components: {
        InputForm,
        InputProducts,
        InputMarketplace,
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            regData: computed(() => store.state.auth.register),
            mps: [],
            Step: (v) => {
                store
                    .dispatch('auth/register/Set', { k: 'auth_reg_step', v })
                    .then(() => {
                        store.dispatch('auth/register/LoadSet')
                    })
            },
            marketplaces: () => {
                const mpx = []
                for (const [k, v] of Object.entries(res.regData.marketplace)) {
                    mpx.push({ k, v })
                }
                res.mps = mpx
            },
        })
        onMounted(() => {
            res.marketplaces()
        })
        return { res }
    },
})
</script>
