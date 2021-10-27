<template lang="pug">
.flex.pb-2
    b-form-checkbox(
        name='check-button',
        switch,
        :checked='res.show',
        @change='res.show = !res.show'
    )
        div(style='margin-top: -2px') {{ name }}

    transition(name='fade')
        b-input-group.pt-1(v-if='res.show')
            //- template(#prepend)
            //-     b-input-group-text https://
            b-form-input(:value='res.value', v-debounce:400='res.Change')
</template>
<script>
import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { store } = useContext()
        const res = reactive({
            value: '',
            show: false,
            data: computed(
                () => store.state.auth.register.form.marketplace[props.name]
            ),
            Change: (v) => {
                store.dispatch('auth/register/SaveFormMarketplace', {
                    k: props.name,
                    v,
                })
            },
        })

        onMounted(() => {
            setTimeout(() => {
                if (res.data === '') {
                    res.value = props.value
                } else {
                    res.show = true
                    res.value = res.data
                }
            }, 1000)
        })
        return { res }
    },
})
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
