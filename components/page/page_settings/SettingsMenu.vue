<template lang="pug">
.flex.b-t
    SidebarMenu(:menu='res.menu')
</template>
<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const res = reactive({
            menu: [
                {
                    head: true,
                    id: 'xprofile',
                    title: 'profile',
                },
                {
                    id: 'profile',
                    title: 'Informasi Pribadi',
                    link: '/settings',
                    icon: 'account-outline',
                },
                {
                    id: 'alamat',
                    title: 'Alamat Toko & Pengiriman',
                    link: '/settings/alamat',
                    icon: 'map-marker-multiple-outline',
                },
                {
                    id: 'marketplace',
                    title: 'Online Store / Marketplace',
                    link: '/settings/marketplace',
                    icon: 'cart-arrow-right',
                },
                {
                    id: 'notification',
                    title: 'Notifikasi',
                    link: '/settings/notification',
                    icon: 'bell-outline',
                },
                {
                    head: true,
                    id: 'security',
                    title: 'security',
                },
                {
                    id: 'password',
                    title: 'Password',
                    link: '/settings/password',
                    icon: 'shield-key-outline',
                },
            ],
        })
        return { res }
    },
})
</script>
