c<template lang="pug">
//- top navbar
.navbar.navbar-expand-sm.b-b.mainav.fixed-top.navbar-fixed-top
    //- sidebar on header
    .navbarside.d-flex(:class='{ mini: res.sidebarmini }')
        .navbrand.flex.align-self-center
            //- Logo Header
            ThemeLogo

    ul.nav.d-none.d-md-block.no-border
        li.d-flex
            .ml-2
                ThemeSetSidebarMini
            .ml-2(v-if='!$store.state.core.theme.insidebar')
                ThemeSetInsidebarMini(:versi='2')

    //- right menu on header
    ul.nav.navbar-menu.order-0.order-lg-2.border-0
        //- Switch Theme Color
        li
            ThemeSetColor

        //- dropdown notification
        //-ThemeNotification

        //- menu my profile - avatar
        ThemeDropdownProfile

        //- Close/Open floating sidebar on < md
        li.d-md-none.ml-2
            button.btn.btn-light.btn-sm.px-1(
                type='submit',
                v-b-toggle.MainSidebarX
            )
                IconMenuOpenFilled(height='18px', color='#999')
</template>
<script>
import {
    computed,
    defineComponent,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import { BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default defineComponent({
    name: 'HeaderUnauth',
    components: {
        BNavItemDropdown,
        BDropdownItem,
    },
    setup() {
        const ctx = useContext()
        const res = reactive({
            sidebarmini: computed(() => ctx.store.state.core.theme.sidebarmini),
        })
        return { res }
    },
})
</script>
