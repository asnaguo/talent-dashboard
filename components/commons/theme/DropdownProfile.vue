<template lang="pug">
BNavItemDropdown.ml-2(noCaret)
    template(v-slot:button-content)
        BAvatar(variant='light', size='27px', rounded, :src='res.me.avatar')
    BDropdownItem.b-b
        .flex.d-flex.wsm.pt-1.pb-2
            .d-flex.align-self-center
                BAvatar(variant='light', size='36px', :src='res.me.avatar')
            .flex.pl-3
                .flex
                    h6 {{ res.me.fullname }}
                .flex.d-flex
                    span.badge.bg-light {{ res.me.status }}
                    span.badge.bg-success.ml-1 {{ res.me.role }}
    BDropdownItem(to='/profile')
        .flex.wsm.d-flex.px-2.py-1
            IconAccountManage(height='18px')
            span My Profile
    BDropdownItem(to='/auth/logout')
        .flex.wsm.d-flex.px-2.py-1
            IconLogout(height='18px')
            span Logout
</template>
<script>
import {
    computed,
    defineComponent,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import { BNavItemDropdown, BDropdownItem, BAvatar } from 'bootstrap-vue'

export default defineComponent({
    name: 'DropdownProfile',
    components: {
        BNavItemDropdown,
        BDropdownItem,
        BAvatar,
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            me: computed(() => store.state.auth.me),
        })
        return { res }
    },
})
</script>