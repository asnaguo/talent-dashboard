<template lang="pug">
Content
    .container(style='max-width: 460px')
        .mt-3
            .card
                .card-header 
                    .flex
                        h4 Sign Up
                        div Daftar agen AIMI
                .card-body
                    //- client-only
                        Steps
                            Step Step1
                            Step Step2
                            Step Step3
                    RegisterBox
</template>

<script>
// import { Step, Steps } from 'vant'
import RegisterBox from '~/components/page/page_auth/register/Register'
// import 'vant/es/step/style'
// import 'vant/es/steps/style'

export default {
    components: {
        RegisterBox,
        // Steps,
        // Step,
    },
    layout: 'default',
    scrollToTop: true,
    mounted() {
        this.$store.dispatch('auth/register/LoadFormLogin').then(() => {})
    },
}
</script>
