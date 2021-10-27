<template lang="pug">
.flex
    // {{ $device.isMobile }} - {{ $mq }}
    HeaderUnauth
    .mainbox
        nuxt
    client-only
        Build
</template>
<script>
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const { store } = useContext()
        onMounted(() => {
            store.dispatch('core/SetTheme', { k: 'sidebarmini', v: false })
        })
    },
    head() {
        return {
            meta: [
                {
                    hid: 'og:site_name',
                    property: 'og:site_name',
                    content: process.env.site_name,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: process.env.site_title,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: process.env.site_description,
                },
            ],
        }
    },
})
</script>
