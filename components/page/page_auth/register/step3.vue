<template lang="pug">
.flex
    .flex
        InputProducts

    .flex
        .divider-text media promosi

    .flex
        b-form-group(label='Marketplace', v-slot='{ ariaDescribedby }')
            InputMarketplace(
                v-for='m in res.mps',
                :key='m.k',
                :name='m.k',
                :value='m.v'
            )

    .flex.py-3(v-if='res.failmsg')
        .alert.alert-warning Pendaftaran gagal. periksa kembali data anda.

    //- button stepper
    .flex.d-flex.justify-content-between
        b-button(variant='light', @click='res.Step(2)')
            IconFluentChevronLeft(height='18px')
            | Sebelumnya

        b-button(variant='primary', @click='res.Step(4)')
            IconLoading.spin(height='18px', v-if='res.loading')
            span(v-else) Daftar
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
            loading: false,
            failmsg: false,
            Step: (v) => {
                if (v === 4) {
                    res.loading = true
                    store.dispatch('auth/register/Register').then((r) => {
                        if (r === true) {
                            setTimeout(() => {
                                res.loading = false
                                store
                                    .dispatch('auth/register/Set', {
                                        k: 'auth_reg_step',
                                        v,
                                    })
                                    .then(() => {})
                            }, 1000)
                        } else {
                            res.loading = false
                            res.failmsg = true
                            setTimeout(() => {
                                res.failmsg = false
                            }, 3000)
                        }
                    })
                } else {
                    store.dispatch('auth/register/Set', {
                        k: 'auth_reg_step',
                        v,
                    })
                }
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
