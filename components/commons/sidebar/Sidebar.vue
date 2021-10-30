<template lang="pug">
.sidebar.d-none.d-md-block(:class='{ mini: res.sidebarmini }')
    //- -------------------------
    //- usual sidebar
    //- -------------------------
    .flex.pt-2
        .flex.sdx
            SDefault
</template>
<script>
import {
    computed,
    defineComponent,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import { BOverlay, BSidebar } from 'bootstrap-vue'
import SDefault from '~/components/menusidebar/index'

export default defineComponent({
    name: 'Sidebar',
    components: {
        BOverlay,
        BSidebar,
        SDefault,
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            sidebarmini: computed(() => store.state.core.theme.sidebarmini),
        })
        return { res }
    },
})
</script>

<style lang="scss"></style>
