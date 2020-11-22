const notFound = (req, res, next) => { 
    const err = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(err)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)  
    console.log(err)
    res.json({
        message: err.message,
        stack: process.env.NODE_EVN === 'production' ? null : err.stack      
    })
}

export {notFound, errorHandler}