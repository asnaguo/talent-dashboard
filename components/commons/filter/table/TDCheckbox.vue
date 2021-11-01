<template lang="pug">
b-form-checkbox(name='selected-rows', @change='SelectAll')
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
    },
    setup(props) {
        const { SelectAll } = UseSelect(props.store)
        return { SelectAll }
    },
})
</script>
