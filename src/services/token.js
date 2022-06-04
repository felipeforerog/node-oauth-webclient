const request = require('request')



const getOuthToken = (datos, callback) => {
    console.log("datos: ",datos)

    const hostOTDS = datos.otdsHost
    const url = hostOTDS+'/otdsws/oauth2/token'
    console.log("url: "+url)

    const dataBody = 
        'grant_type='+datos.grantType+'&'+
        'client_id='+datos.clientID+'&'+
        'client_secret='+datos.clientSecret+'&'+
        'subject_token='+datos.subjectToken+'&'+
        'subject_token_type='+datos.subjectTokenType

        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: url,
            rejectUnauthorized: false,
            body: dataBody
        },
        (error, response, body) => {
            if(error){
                callback('Error llamado el servicio', undefined)
            }
            callback(undefined, body)
        });
}



module.exports = getOuthToken