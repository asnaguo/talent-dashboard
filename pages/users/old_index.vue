<template lang="pug">
Content(title='User Manager')
    //-template(v-slot:insidebar)
        .flex
            SidebarMenu

    template(v-slot:filter)
        .flex.d-flex.flex-column-sm
            .mr-2
                b-form-input#input-1.border-outline(
                    size='sm',
                    type='email',
                    placeholder='Search by Email',
                    required,
                    v-model='res.q',
                    v-debounce:300ms='res.SearchBy'
                )
            .mr-2
                button.btn.btn-sm.btn-outline.mr-2
                    i.mdi.mdi-account-multiple.mdi-18px.d-flex.align-self-center.px-1
                    | total {{ $store.state.users.total }}
        //-.flex.d-flex.flex-column-sm
            button.btn.btn-sm.btn-outline.mr-2
                i.mdi.mdi-sort.mdi-18px.d-flex.align-self-center.px-1
                | Sort

            .mr-2
                b-form-input#input-1.border-outline(
                    size='sm',
                    type='email',
                    placeholder='Search',
                    required
                )
            .mr-2
                b-button(size='sm', variant='outline')
                    .d-flex.flex.flex-nowrap
                        i.mdi.mdi-refresh.mdi-18px

            .mr-2
                b-button(size='sm', variant='outline')
                    .flex.flex-nowrap Result:&nbsp;100

            .mr-2
                .input-group.input-group-sm.mr-2(style='max-width: 110px')
                    .input-group-prepend
                        label.input-group-text Limit
                    b-form-select(
                        :value='40',
                        style='height: 31px',
                        :options='[10, 20, 30, 40]'
                    )

            b-dropdown.mr-2(size='sm', right, variant='white')
                template(#button-content)
                    i.mdi.mdi-fire.mdi-18px
                    .px-2 Accounts
                b-dropdown-item Item 1
                b-dropdown-item Item 2
                b-dropdown-item Item 3

            b-dropdown#dropdown-form.mr-2(
                text='Dropdown with form',
                size='sm',
                ref='dropdown',
                variant='outline'
            )
                b-dropdown-form
                    b-form-radio.px-3(name='smx', value='7', v-model='res.val') Last 7 Days
                    b-form-radio.px-3(
                        name='smx',
                        value='14',
                        v-model='res.val'
                    ) Last 14 Days
                    b-form-radio.px-3(
                        name='smx',
                        value='30',
                        v-model='res.val'
                    ) Last 30 Days
                    b-form-radio.px-3(
                        name='smx',
                        value='90',
                        v-model='res.val'
                    ) Last 90 Days
                b-dropdown-divider
                b-dropdown-item-button
                    .flex.d-flex.px-1(style='min-width: 140px')
                        i.mdi.mdi-plus.mdi-18px
                        .px-1.pt-1 Add Custom

    //- ===============
    .flex
        .flex
            b-table(
                table-class='text-sm table table-theme v-middle table-hover table-condensed',
                small,
                tdClass='text-danger',
                :fields='res.fields',
                :items='res.users',
                responsive='sm',
                ref='selectableTable',
                select-mode='multi',
                selectable,
                no-select-on-click,
                selected-variant='active'
            )
                //- selected
                template(v-slot:cell(selected)='{ item, index }')
                    b-form-checkbox(
                        :selected='item.selected',
                        name='selected-rows',
                        @change='SelectRow(index, item.selected)'
                    )

                //- avatar
                template(#cell(avatar)='data')
                    b-avatar(variant='light', :src='data.value', size='24')

                //- role
                template(#cell(role)='{ value }')
                    b-badge(variant='primary', v-if='value === "admin"') {{ value }}
                    b-badge(variant='light', v-else) {{ value }}
        //- pre {{ res.users }}
        pre {{ res.selected }}
</template>

<script>
import {
    ref,
    computed,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
export default {
    layout: 'authenticated',
    middleware: 'authenticated',
    setup() {
        const { store } = useContext()
        const selectableTable = ref(null)

        const res = reactive({
            q: '',
            users: computed(() => store.state.users.results),
            selected: [],
            fields: [
                {
                    key: 'selected',
                    label: '#',
                    tdClass: 'w-slct',
                },
                {
                    key: 'avatar',
                    label: 'Ava',
                    tdClass: 'w-ava',
                },
                {
                    key: 'fullname',
                    label: 'Full Name',
                    tdClass: 'text-primary',
                },
                {
                    key: 'role',
                    label: 'Role',
                    tdClass: 'w-status',
                },
                {
                    key: 'email',
                    label: 'Email',
                    tdClass: 'w-email',
                },
                { key: 'whatsapp', label: 'avatar', tdClass: 'w-input' },
                { key: 'status', label: 'status', tdClass: 'w-status' },
            ],
            SearchBy: () => {
                store.commit('users/SET', { k: 'filterby', v: 'email' })
                store.commit('users/SET', { k: 'q', v: res.q })
                store.dispatch('users/FetchAll').then(() => {
                    require('consola').info('users loaded')
                })
            },
            selectThirdRow(x, v) {
                // if (!v) this.$refs.selectableTable.selectRow(x)
                // else this.$refs.selectableTable.unselectRow(x)

                // if (!v) selectableTable.selectRow(x)
                // else this.$refs.selectableTable.unselectRow(x)
                require('consola').info('xxx', selectableTable.value)

                // this.res.users[x].selected = !v
                // store.dispatch('users/SetData', {k: ''})
                store.commit('users/SETUSER', { i: x, v: !v })

                const ws = []
                res.users.forEach((x) => {
                    if (x.selected) {
                        ws.push(x.email)
                    }
                })
                res.selected = ws
            },
        })
        onMounted(() => {
            // load data from indexed
            // store.dispatch('users/LoadData').then(() => {
            //     store.dispatch('users/FetchAll').then(() => {
            //         require('consola').info('users loaded')
            //     })
            // })
            store.dispatch('users/FetchAll').then(() => {
                require('consola').info('users loaded')
            })
        })
        return { res, selectableTable }
    },

    methods: {
        SelectRow(x, v) {
            if (!v) this.$refs.selectableTable.selectRow(x)
            else this.$refs.selectableTable.unselectRow(x)
            this.$store.commit('users/SETUSER', { i: x, v: !v })

            const ws = []
            this.res.users.forEach((x) => {
                if (x.selected) {
                    ws.push(x.email)
                }
            })
        },
    },
}
</script>
