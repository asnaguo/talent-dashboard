<template lang="pug">
.flex.m-3
    b-form-group.b-b.pb-3(
        label-cols-sm='12',
        label-cols-lg='4',
        label='User ID'
    )
        b-form-input(trim, disabled, style='border: solid 1px #e1e1e1')

    b-form-group.b-b.pb-3(
        label-cols-sm='12',
        label-cols-lg='4',
        label='Referral'
    )
        b-form-input(trim, disabled, style='border: solid 1px #e1e1e1')

    b-form-group.b-b.pb-3(
        label-cols-sm='12',
        label-cols-lg='4',
        label='Nama Lengkap'
    )
        b-form-input(trim)

    b-form-group.b-b.pb-3(label-cols-sm='12', label-cols-lg='4', label='Email')
        b-form-input(trim)

    b-form-group.b-b.pb-3(
        label-cols-sm='12',
        label-cols-lg='4',
        label='Whatsapp'
    )
        .flex
            b-form-input(trim)
        .flex.pt-3
            b-form-textarea#textarea(
                placeholder='halo, saya tertarik dengan produk ini...',
                rows='3',
                max-rows='6'
            )
            .text-sm.label.text-muted greeting message untuk customer
</template>
