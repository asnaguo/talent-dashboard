export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
    form: {
        email: '',
    },
    msg: '',
    loading: false,
    forgot_status: 0
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SETFORM(state, { k, v }) {
        state.form[k] = v
    },
    SETSTAT(state, v) {
        state.forgot_status = v
    },
}

export const actions = {
    /**
     * Load form data dari pouchdb _id: authform
     */
    async LoadForm({ state, commit }) {
        for (const [k, v] of Object.entries(state.form)) {
            try {
                const vv = await this.$localForage.user.getItem('form_' + k)
                commit("SETFORM", { k, v: vv })
            } catch {
                await this.$localForage.user.setItem('form_' + k, v)
            }
        }
        await commit('SET', { k: 'loaded', v: true })
    },

    /**
    * Save form data ke pouchdb _id: authform
    */
    async ChangeEmail({ commit }, { k, v }) {
        await commit('SETFORM', { k, v })
    },

    /**
     * Trigger reset password ke api
    */
    async RequestPasswordReset({ state, commit }) {
        commit('SET', { k: 'loading', v: true })

        try {

            // submit data to api
            await this.$axios.post('v1/auth/forgot_password', {
                email: state.form.email,
            })
            commit('SET', { k: 'loading', v: false })
            commit('SET', { k: 'msg', v: 'periksa email untuk reset password' })
            commit('SETSTAT', 2)

            return true

        } catch (e) {
            commit('SETSTAT', 1)
            commit('SET', { k: 'msg', v: 'Periksa Email atau Hubungi CS' })
        }

        // timeout effect
        setTimeout(() => {
            commit('SETSTAT', 1)
            commit('SET', { k: 'loading', v: false })
            return false
        }, 1000)
    }
}

// export const getters = {
//     loaded: (state) => state.loaded,
// }

export default {
    namespaced: true,
    strict,
    state,
    actions,
    // getters,
    mutations,
}
