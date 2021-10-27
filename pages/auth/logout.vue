<template lang="pug">
.container.p-4
    .flex.d-flex.justify-content-center loading
</template>

<script>
export default {
    layout: 'default',
    scrollToTop: true,
    mounted() {
        this.$store.commit('SET', { k: 'islogin', v: false })
        this.$cookiz.set('auth.islogin', false)

        setTimeout(() => {
            this.$router.push('/auth/login?utm_source=logout')
        }, 1000)
    },
}
</script>