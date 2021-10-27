<template lang="pug">
.container(style='max-width: 380px')
    .mt-3
        .card
            .card-header 
                .flex
                    h4 Lupa Password
                    div Masukkan email untuk reset password
            .card-body.p-3
                ForgotBox
</template>
<script>
import ForgotBox from '~/components/page/page_auth/forgot/Forgot'

export default {
    name: 'ForgotPage',
    components: {
        ForgotBox,
    },
    layout: 'default',
}
</script>
