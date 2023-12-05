const socket = io()

let user
let chatBox = document.getElementById('chatBox')
let log = document.getElementById('messageLog')
let data

socket.on('message', msg => {
    data = msg
})

socket.on('messageLog', msgs=>{
    renderizar(msgs)
})

const renderizar = (msgs) => {
    let messages = ''

    msgs.forEach(message => {
      const isCurrentUser = message.user === user
      const messageClass = isCurrentUser ? 'my-message' : 'other-message'
      messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`  
    })

    log.innerHTML = messages
    chatBox.scrollIntoView(false)
}

Swal.fire({
    title: 'Identificate',
    input: 'email',
    text: 'ingresa tu correo para identificarte',
    inputValidator: (value) =>{
        if(!value)
           return 'ingresa tu correo para continuar'

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.text(value))
           return 'ingrese un correo valido'

        return null
    },
    allowOutsideClick: false
}).then(result => {
    if(result.isConfirmed){
        user = result.value
        renderizar(deta)
    }
})

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if(chatBox.value.trim().length > 0){
            const message = chatBox.value
            socket.emit('message', {user, message})
            chatBox.value = ''
        }
    }
})

socket.on('nuevo_user', () =>{
    Swal.fire({
        text: 'Nuevo usuario se ha conectado',
        toast: true,
        position: 'top-right'
    })
})