export default function ({ $axios, $cookiz }) {
    // set base url
    // if (process.env.NODE_ENV === 'development') {
    //     $axios.setBaseURL('http://api.jorjoran.net')
    // } else {
    //     $axios.setBaseURL(process.env.api)
    // }
    $axios.setBaseURL(process.env.api)

    // set header json
    $axios.setHeader('Content-Type', 'application/json')

    // with authorization if token exists
    const tkn = $cookiz.get('auth.token')
    if (tkn) {
        $axios.setHeader('Authorization', `Bearer ${tkn}`)
    }
    /*
    $axios.onRequest((config) => {
        require("consola").info('axiosREQ', config)
    })
    */
    $axios.onError(() => {
        // const code = parseInt(error.response && error.response.status)
    })
}
