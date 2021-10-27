<template lang="pug">
//- top navbar
.navbar.navbar-expand-sm.b-b.mainav.fixed-top.navbar-fixed-top
    //- sidebar on header
    .navbarside.d-flex(style='border: none')
        .navbrand.flex.align-self-center
            //- Logo Header
            ThemeLogo

    //- right menu on header
    ul.nav.navbar-menu.order-0.order-lg-2.border-0
        //- Switch Theme Color
        li
            ThemeSetColor
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import {
    BButton,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
} from 'bootstrap-vue'

export default defineComponent({
    name: 'HeaderUnauth',
    components: {
        BButton,
        BNavItemDropdown,
        BDropdownItem,
        BAvatar,
    },
})
</script>
<style lang="scss">
.wsm {
    width: 200px;
}
</style>