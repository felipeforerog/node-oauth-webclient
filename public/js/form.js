//submit form
const oauthForm = document.getElementById("oauthForm")
oauthForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const otds = document.getElementById("otds").value
    const gt = document.getElementById("gt").value
    const cid = document.getElementById("cid").value
    const cs = document.getElementById("cs").value
    const st = document.getElementById("st").value
    const stt = document.getElementById("stt").value
    
    if(!otds.trim() || !gt.trim() || !cid.trim() || !cs.trim() || !st.trim() || !stt.trim()){
        return alert('Todos los datos son obligatorios!')
    }

    estadoConsulta("off")
    fetch(`/auth?otds=${encodeURIComponent(otds)}&gt=${gt}&cid=${cid}&cs=${cs}&st=${st}&stt=${stt}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                document.getElementById("tokenR").innerHTML = data.error
            }else{
                document.getElementById("tokenR").innerHTML = JSON.stringify(data, undefined, 2)
                document.getElementById("token").value = data.access_token
            }
            estadoConsulta("on")
        })
    })
})


//estado boton
const estadoConsulta = (estado) => {
    const btn1 = document.getElementById("btn1")
    if(estado === 'on'){
        btn1.disabled = false
        btn1.textContent = "Obtener token"
        btn1.classList.add('btnForm_hover')
        btn1.classList.remove('btnForm_disabled')
    }else{
        btn1.disabled = true
        btn1.textContent = "Consultando..."
        btn1.classList.remove('btnForm_hover')
        btn1.classList.add('btnForm_disabled')
    }
}