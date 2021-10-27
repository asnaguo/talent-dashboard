export default function (req, res, next) {
    require("consola").info('req.url', req.url)
    next()
}
