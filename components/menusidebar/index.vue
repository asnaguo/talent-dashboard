<template lang="pug">
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
                    id: 'hdashboard',
                    title: 'Dashboard',
                },
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    link: '/',
                    icon: 'collage',
                },
                {
                    id: 'users',
                    title: 'Users',
                    link: '/users',
                    icon: 'account-multiple',
                    iconVariant: 'primary',
                },
                // {
                //     id: 'template',
                //     title: 'Template',
                //     link: '/template',
                //     icon: 'palette',
                //     iconVariant: 'success',
                //     count: 10,
                //     countVariant: 'danger',
                // },
                {
                    head: true,
                    id: 'hadministrator',
                    title: 'admin',
                },
                {
                    id: 'settings',
                    title: 'Profil Saya',
                    icon: 'account-box',
                    link: '/settings',
                },
                {
                    id: 'administrator',
                    title: 'Administrator',
                    icon: 'settings',
                    link: '/administrator',
                },
            ],
        })
        return { res }
    },
})
</script>
