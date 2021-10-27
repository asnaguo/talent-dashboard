<template lang="pug">
.flex
    b-form-group(label='Referral', v-slot='{ ariaDescribedby }')
        b-form-select(
            :value='res.referral',
            v-model='res.prds',
            :options='res.options',
            @change='res.Change'
        )

    b-form-group(
        label='Super Agen',
        v-slot='{ ariaDescribedby }',
        v-if='res.isnotpusat'
    )
        b-form-select(
            :value='res.refname',
            :options='res.superagen',
            @change='res.ChangeSuper'
        )
        //- b-form-checkbox-group#checkbox-group-1(
        //-     :value='res.referral',
        //-     v-model='res.prds',
        //-     :options='res.options',
        //-     :aria-describedby='ariaDescribedby',
        //-     name='referral',
        //-     @change='res.Change'
        //- )
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
            referral: computed(() => store.state.auth.register.form.referral),
            refname: computed(() => store.state.auth.register.form.refname),
            isnotpusat: false,
            prds: [],
            options: [
                { text: 'Agen Pusat', value: 'AGENPUSAT' },
                { text: 'Super Agen', value: 'SUPERAGEN' },
            ],
            superagen: [
                { text: 'Putra', value: 'PUTRA' },
                { text: 'BDG', value: 'BDG' },
                { text: 'Aceh', value: 'ACEH' },
                { text: 'Anita', value: 'ANITA' },
                { text: 'Puspa', value: 'PUSPA' },
            ],
            Change: (c) => {
                store.dispatch('auth/register/SaveFormLogin', {
                    k: 'referral',
                    v: c,
                })
                if (c === 'AGENPUSAT') {
                    res.isnotpusat = false
                    store.dispatch('auth/register/SaveFormLogin', {
                        k: 'refname',
                        v: 'PUSAT',
                    })
                } else {
                    res.isnotpusat = true
                }
                res.prds = c
            },
            ChangeSuper: (c) => {
                store.dispatch('auth/register/SaveFormLogin', {
                    k: 'refname',
                    v: c,
                })
            },
        })
        onMounted(() => {
            store.dispatch('auth/register/LoadSet').then(() => {
                setTimeout(() => {
                    res.prds = res.referral
                    if (res.referral !== 'AGENPUSAT') {
                        res.isnotpusat = true
                    }
                }, 1000)
            })
        })
        return { res }
    },
    mounted() {},
})
</script>
