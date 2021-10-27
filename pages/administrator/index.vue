<template lang="pug">
Content(title='User Manager')
    template(v-slot:insidebar)
        .flex
            SidebarMenu

    template(v-slot:filter)
        .flex.d-flex.flex-column-sm
            button.btn.btn-sm.btn-outline.mr-1.rounded-pill Menu 1
            button.btn.btn-sm.btn-outline.mr-1.rounded-pill Menu 2

    .container.p-5
        nuxt-link(to='/auth/logout') 
            button.btn.btn-light(type='submit') Logout
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
export default {
    layout: 'authenticated',
    middleware: 'authenticated',
    setup() {
        const res = reactive({})
        return { res }
    },
}
</script>
