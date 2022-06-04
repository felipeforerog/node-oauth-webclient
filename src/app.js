//imports
const path = require('path')
const express = require('express')
const getOuthToken = require('./services/token')
const datosIni = require('./services/datos')


//crea instancia de aplicacion
const app = express()
//heroku port
const port = process.env.PORT || 3000

//configuraciones adicionales de express
    //path de vistas hbs
const viewsPath = path.join(__dirname, '../templates')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
    //directorio publico
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


//index.html
app.get('', (req, res) => {
    //const queryData = req.query
    res.render('index', datosIni)
})
//servicio auth
app.get('/auth', (req, res) => {
    const queryData = req.query
    if(!queryData.otds || !queryData.gt || !queryData.cid || !queryData.cs || !queryData.st || !queryData.stt){
        console.log(queryData)
        console.log("Parametros OAuth obligatorios...")
        res.send( {error:'Parametros OAuth obligatorios...'} )
        return
    }

    const datos = {
        otdsHost : queryData.otds,
        grantType : queryData.gt,
        clientID : queryData.cid,
        clientSecret : queryData.cs,
        subjectToken : queryData.st,
        subjectTokenType : queryData.stt,
    }

    getOuthToken(datos, (error, data) => {
        if(error){
            res.send(error)
        }
        res.send(data)
    })
})
//Cualquier otro
app.get('*', (req, res) => {
    res.send('404 page not found')
})


//arranca el servicio
app.listen(port, () =>{
    console.log('Server is up on port '+port)
})

