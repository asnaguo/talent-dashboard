<template lang="pug">
.flex
    client-only
        //- Form Register
        b-form(action='#')
            Step1(v-if='res.auth_reg_step === 1')
            Step2(v-if='res.auth_reg_step === 2')
            Step3(v-if='res.auth_reg_step === 3')
            Step4(v-if='res.auth_reg_step === 4')
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
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'

export default defineComponent({
    Name: 'RegisterBox',
    components: {
        InputForm,
        Step1,
        Step2,
        Step3,
        Step4,
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            auth_reg_step: computed(
                () => store.state.auth.register.auth_reg_step
            ),
        })
        onMounted(() => {
            store.dispatch('auth/register/LoadSet')
        })
        return { res }
    },
})
</script>
