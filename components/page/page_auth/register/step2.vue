<template lang="pug">
.flex
    .flex
        InputAlamat

    //- button stepper
    .flex.d-flex.justify-content-between.mt-2
        b-button(variant='light', @click='res.Step(1)')
            IconFluentChevronLeft(height='18px')
            | Sebelumnya

        b-button(variant='primary', @click='res.Step(3)') Selanjutnya
            IconFluentChevronRight(height='18px')
</template>
<script>
import {
    defineComponent,
    computed,
    reactive,
    useContext,
    onMounted,
} from '@nuxtjs/composition-api'
import InputAlamat from './input-alamat'

export default defineComponent({
    components: {
        InputAlamat,
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
