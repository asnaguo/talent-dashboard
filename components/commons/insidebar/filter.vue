<template lang="pug">
.flex
    .flex.d-flex.justify-content-between
        .pr-2
            button.btn.btn-sm.btn-outline(type='submit', v-b-toggle.contentFilter) 
                IconCarbonFilter(height='18px')
                .pl-1 Filter

        //- right icon
        Menu
    .flex
        BCollapse#contentFilter
            .pt-2 
                slot
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { BCollapse } from 'bootstrap-vue'
import Menu from './menu'
export default defineComponent({
    components: {
        BCollapse,
        Menu,
    },

    setup() {},
})
</script>
