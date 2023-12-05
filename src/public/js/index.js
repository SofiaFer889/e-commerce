const socket = io()

socket.on('products', products =>{
    const tbody = document.getElementById(productsBody)
    tbody.innerHTML = ''

    products.forEach(products => {
        const row = tbody.insertRow()

        row.innerHTML = `
        <td>${products._id}</td>
        <td>${products.title}</td>
        <td>${products.description}</td>
        <td>${products.price}</td>
        <td>${products.code}</td>
        <td>${products.stock}</td>
        <td>${products.category}</td>
        <td>${products.status ? 'Activo': 'Desactivado'}</td>
        <td>${products.thumbnails.length > 0 ? products.thumbnails[0]: 'no hay imagen'}</td>
        `
    })
})

const form = document.getElementById('productForm')

form.addEventListener('submit', function(even){
    even.preventDefault()

    const titulo = document.getElementById('titulo').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value
    const codigo = document.getElementById('codigo').value
    const stock = document.getElementById('stock').value
    const categoria = document.getElementById('categoria').value
    const status = document.getElementById('status').value
    const imagen = document.getElementById('imagen').value

    const product = {
        title : titulo, 
        description : descripcion, 
        price : precio, 
        code : codigo,
        stock : stock, 
        category : categoria,
        status : status,
        thumbnails : imagen ,
    }

    socket.emit('agregarProducto', product)
    form.reset()
})