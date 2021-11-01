<template lang="pug">
b-form-checkbox(
    :checked='item.select',
    name='selected-rows',
    @change='SelectRow(index, item)'
)
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import UseSelect from '~/plugins/rizamodules/UseSelect'

export default defineComponent({
    props: {
        store: {
            type: String,
            default: '',
        },
        item: {
            type: Object,
            default: () => {},
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const { SelectRow } = UseSelect(props.store)
        return { SelectRow }
    },
})
</script>
