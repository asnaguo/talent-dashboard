// // import Pouch from "~/plugins/pouch"
// export const strict = process.env.NODE_ENV !== "production"

// export const state = () => ({
//     loading: false,
//     endpoint: 'http://api.jorjoran.net/v1/jne',
//     provs: [],
//     kabs: [],
//     kecs: [],
//     kels: [],
//     provinsi: "",
//     kabupaten: "",
//     kecamatan: "",
//     kelurahan: "",
//     jnecode: "",
//     origin: "CGK10000",
//     dest: "",
//     weight: 1,
//     data: {},
//     prices: []
// })

// export const mutations = {
//     SET(state, { k, v }) {
//         state[k] = v
//     },
// }

// export const actions = {
//     async getProvinsi({ state, commit }) {
//         commit("SET", { k: "loading", v: true })
//         const { data } = await this.$axios.get(`${state.endpoint}/provinsi`)
//         if (data) {
//             commit("SET", { k: "provs", v: data.results })
//             commit("SET", { k: "loading", v: false })
//             commit("SET", { k: "kabupaten", v: "" })
//             commit("SET", { k: "kecamatan", v: "" })
//             commit("SET", { k: "kelurahan", v: "" })
//         }
//     },
//     async getKabupaten({ state, commit }, k) {
//         commit("SET", { k: "loading", v: true })
//         const { data } = await this.$axios.get(`${state.endpoint}/kab/${k}`)
//         if (data) {
//             commit("SET", { k: "kabs", v: data.results })
//             commit("SET", { k: "loading", v: false })
//             commit("SET", { k: "kecamatan", v: "" })
//             commit("SET", { k: "kelurahan", v: "" })
//         }
//     },
//     async getKecamatan({ state, commit }, dat) {
//         commit("SET", { k: "loading", v: true })
//         const { data } = await this.$axios.get(`${state.endpoint}/kec/${dat.provinsi}/${dat.kabupaten}`)
//         if (data) {
//             commit("SET", { k: "kecs", v: data.results })
//             commit("SET", { k: "loading", v: false })
//             commit("SET", { k: "kelurahan", v: "" })

//         }
//     },
//     async getKelurahan({ state, commit }, dat) {
//         commit("SET", { k: "loading", v: true })
//         const { data } = await this.$axios.get(`${state.endpoint}/kel/${dat.provinsi}/${dat.kabupaten}/${dat.kecamatan}`)
//         if (data) {
//             commit("SET", { k: "kels", v: data.results })
//             commit("SET", { k: "loading", v: false })
//         }
//     },
//     async getTarif({ state, commit, dispatch }, dat) {
//         commit("SET", { k: "loading", v: true })
//         const { data } = await this.$axios.get(`${state.endpoint}/dat/${dat.provinsi}/${dat.kabupaten}/${dat.kecamatan}/${dat.kelurahan}`)
//         if (data) {
//             commit("SET", { k: "data", v: data.result })
//             commit("SET", { k: "dest", v: data.result.kodetarif })

//             commit("SET", { k: "loading", v: false })
//             dispatch('getJneTarif')
//         }
//     },
//     async getJneTarif({ state, commit }) {
//         const { data } = await this.$axios.get(`${state.endpoint}/cek/${state.origin}/${state.dest}/${state.weight}`)
//         if (data) {
//             commit("SET", { k: "prices", v: data.results })
//         }
//     }

// }

// // export const getters = {
// //     loaded: (state) => state.loaded,
// // }

// export default {
//     namespaced: true,
//     strict,
//     state,
//     actions,
//     // getters,
//     mutations,
// }
