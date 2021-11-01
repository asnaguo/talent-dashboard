<template lang="pug">
BSidebar(
    :id='id',
    :title='title',
    backdrop,
    bg-variant='white',
    shadow,
    :left='left',
    :right='right',
    :width='`${width}`'
)
    slot
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        left: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            default: 'drawer001',
        },
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '450px',
        },
    },
    setup() {},
})
</script>
