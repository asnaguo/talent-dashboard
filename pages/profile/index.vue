<template lang="pug">
Content(title='User Manager')
    //-template(v-slot:insidebar)
        .flex
            SidebarMenu(:menu='res.menu')

    //-template(v-slot:filter)
        .flex.d-flex.flex-column-sm
            button.btn.btn-sm.btn-outline.mr-1.rounded-pill Menu 1
            button.btn.btn-sm.btn-outline.mr-1.rounded-pill Menu 2

    .container.p-5
        .flex
            pre {{ $store.state.auth.me }}
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
export default {
    layout: 'authenticated',
    middleware: 'authenticated',
    setup() {
        const res = reactive({
            menu: [
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
            ],
        })
        return { res }
    },
}
</script>
