<template lang="pug">
.content
    Insidebar(v-if="$slots.insidebar" :title='title')
        template(v-slot:filter)
            slot(name='filter')
        slot(name='insidebar')
    
        
    .flex
        //- filter
        mq-layout(:mq='["lg"]')
            .flex.px-3.py-2.b-b(v-if="$slots.filter")
                slot(name='filter')
        
        //-content
        .flex(v-if="$slots")
            slot
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import Insidebar from '~/components/commons/insidebar'
export default defineComponent({
    components: {
        Insidebar,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    setup() {},
})
</script>
