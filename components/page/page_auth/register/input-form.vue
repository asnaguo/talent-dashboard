<template lang="pug">
//- input email
.flex
    b-form-group(:label='label', :label-for='"frm" + name')
        b-form-input(
            :id='"frm" + name',
            :type='type',
            :placeholder='placeholder',
            :value='value',
            v-debounce:400='res.Change',
            :class='{ "is-invalid": res.isvalid === false }',
            :style='res.stl'
        )
        .text-sm.text-danger(v-if='res.isvalid === false').
            {{res.validmsg}}
        .text-sm.text-success(v-if='res.isvalid === true').
            {{res.validmsg}}
</template>
<script>
import {
    defineComponent,
    onMounted,
    reactive,
    // useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        label: {
            type: String,
            default: 'Fullname',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'text',
        },
        value: {
            type: String,
            default: '',
        },
    },
    emits: ['change'],

    setup(props, { emit }) {
        // const { $axios } = useContext()
        const res = reactive({
            isvalid: null,
            validmsg: '',
            stl: {},
            CheckEmail: (value) => {
                // try {
                //     $axios
                //         .post(`/v1/auth/is_email_available`, { email: value })
                //         .then((r) => {
                //             if (r.data.status === false) {
                //                 res.isvalid = false
                //                 res.validmsg = r.data.detail
                //             }
                //         })
                // } catch {
                //     res.isvalid = true
                //     res.validmsg = 'email valid'
                // }
            },
            Change: (v) => {
                emit('change', { k: props.name, v })

                // validasi
                if (props.name === 'email') {
                    res.CheckEmail(v)
                } else if (props.name === 'whatsapp') {
                    if (v.charAt(0) === '0') {
                        emit('change', {
                            k: props.name,
                            v: '+62' + v.substring(1),
                        })
                    }
                    if (v.charAt(0) === '8') {
                        emit('change', {
                            k: props.name,
                            v: '+62' + v.substring(1),
                        })
                    }
                    if (v.charAt(0) + v.charAt(1) === '62') {
                        emit('change', {
                            k: props.name,
                            v: '+62' + v.substring(2),
                        })
                    }
                }
            },
        })

        onMounted(() => {
            if (props.name === 'email') {
                res.CheckEmail(props.value)
            } else if (props.name === 'kodeagen') {
                res.stl = {
                    background: '#fafffe',
                    border: 'dashed 1px #3597e8',
                }
            }
        })
        return { res }
    },
})
</script>
