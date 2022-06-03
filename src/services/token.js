const request = require('request')



const getOuthToken = (datos, callback) => {

    const host_OTDS = 'co-explorationlab.r53.techedgegroup.com:8090'
    const url = 'https://'+host_OTDS+'/otdsws/oauth2/token'
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