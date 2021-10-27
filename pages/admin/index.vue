<template lang="pug">
.content
    //- -------------------------
    //- Sidebar Tengah
    //- -------------------------
    SidebarInside(:width='240')
        .flex.px-2 inside

    //- -------------------------
    //- Main Content
    //- -------------------------
    MainContent
        //- content wajib
        template(v-slot:content)
            //- isi toolbar
            .flex.px-3.py-2.align-self-center awesome
                .py-2.pr-3
                    b-button(
                        size='xs',
                        variant='light',
                        v-b-modal.ModalNewNamespace
                    ) 
                        i.mdi-18px.mdi.mdi-plus
                        .pl-1 Create

            .flex dashboarddashboard
            //    .container(style='max-width: 800px')
                | dashboard
</template>
<script>
export default {
    name: 'AdminIndexPage',
    components: {},
    layout: 'authenticated',
    middleware: 'auth',
    setup() {},
}
</script>
