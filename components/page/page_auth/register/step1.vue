<template lang="pug">
.flex
    //- email
    InputForm(
        label='Email',
        type='email',
        name='email',
        :value='res.formData.email',
        @change='res.Change($event)'
    )

    //- fullname
    InputForm(
        label='Nama Lengkap',
        type='text',
        name='fullname',
        :value='res.formData.fullname',
        @change='res.Change($event)'
    )

    //- whatsapp
    InputForm(
        label='Whatsapp',
        placeholder='+62',
        type='text',
        name='whatsapp',
        :value='res.formData.whatsapp',
        @change='res.Change($event)'
    )

    //- password
    InputForm(
        label='Password',
        placeholder='',
        type='password',
        name='password',
        :value='res.formData.password',
        @change='res.Change($event)'
    )

    //-.flex
        .divider-text data agen

    //- referral
        InputForm(
            label='Referral',
            placeholder='',
            type='text',
            name='referral',
            :value='res.formData.referral',
            @change='res.Change($event)'
        )
    InputReferral

    //- kode agen
    InputForm(
        v-if='res.showkodeagen',
        label='Kode Agen',
        placeholder='Masukkan kode agen anda',
        type='text',
        name='kodeagen',
        :value='res.formData.kodeagen',
        @change='res.Change($event)'
    )

    .flex
        b-button(block, variant='primary', @click='res.Step(2)') Selanjutnya
            IconFluentChevronRight(height='18px')
</template>
<script>
import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import InputForm from './input-form'
import InputReferral from './input-referral.vue'

export default defineComponent({
    components: {
        InputForm,
        InputReferral,
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            showkodeagen: false,
            formData: computed(() => store.state.auth.register.form),
            Step: (v) => {
                store
                    .dispatch('auth/register/Set', { k: 'auth_reg_step', v })
                    .then(() => {
                        store.dispatch('auth/register/LoadSet')
                    })
            },
            Change: (data) => {
                store.dispatch('auth/register/SaveFormLogin', data)
            },
            cekKodeAgen: () => {
                if (
                    res.formData.refname === 'BDG' ||
                    res.formData.refname === 'PUSAT'
                ) {
                    res.showkodeagen = true
                } else {
                    res.showkodeagen = false
                }
            },
        })

        onMounted(() => {
            store.subscribe((x) => {
                if (x.type === 'auth/register/SETFORM') {
                    res.cekKodeAgen()
                }
            })
        })
        return { res }
    },
})
</script>
