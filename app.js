const input1 = document.getElementById('input1')
const lista = document.getElementById('lista')
const divTotal = document.getElementById('divTotal')
let tareasTerminadas = 0
const btnAgregar = document.getElementById('btnAgregar')
const alertaDiv = document.getElementById('alertaDiv')
let inputCheck = true

renderLista()
alerta()

const agregarLista = function (...items) {
    let item = { id: Date.now(), name: items[0], status: false }
    datos.push(item)
}

function borrar(id) {

    const index = datos.findIndex((ele) => ele.id == id)
    datos.splice(index, 1)
    renderLista()
}

function renderLista() {
    let listHeader = `
    
    <li class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex gap-2 col-9">
                <p class="m-0 col-3">ID</p>
                <p class="m-0 col-8">Nombre de la actividad</p>                
            </div>
            <div class="d-flex col-3 justify-content-between">
                <p class="col-4 text-center">Estado</p>
                <p class="col-8"></p>
                
            </div>
            
            </li>
    
    `
    let html = ''
    for (const dato of datos) {
        html += `

            <li class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex gap-2 col-9">
                <p class="m-0 col-3">${dato.id}</p>
                <p class="m-0 col-8">${dato.name}</p>
                
            </div>
            <div class="d-flex col-3 justify-content-between">
                <input class="col-4" type="checkbox" id="checkBox${dato.id}" onclick="cambiarStatus(${dato.id})">
                <button class="col-8  btn btn-danger d-block" onclick="borrar(${dato.id})">eliminar</button>
            </div>
            
            </li>
            `
    }
    lista.innerHTML = listHeader + html
    datosStatus()
    renderTotal()
}

function renderTotal() {
    html = ''
    html = `
        <p class="h2">TOTAL: ${datos.length}</p>
        <p class="h3">TERMINADAS: ${tareasTerminadas}</p>
    `
    divTotal.innerHTML = html
}

function cambiarStatus(id) {

    for (const dato of datos) {

        if (id == dato.id) {
            if (dato.status === true) {
                dato.status = false
            }
            else {
                dato.status = true
            }
        }
    }
    datosStatus()
    renderTotal()
}

function datosStatus() {
    let contador = 0
    for (const dato of datos) {
        let checkBox = document.getElementById(`checkBox${dato.id}`)
        if (dato.status == true) {
            checkBox.checked = 'true'
            contador++
        }
        else {
            checkBox.checkBox = 'false'
        }

    }
    tareasTerminadas = contador

}

function alerta(inputCheck) {
    if (inputCheck == true) {
        alertaDiv.style.display = 'block'
        let html = `
        <p>Porfavor ingrese el nombre de la nueva actividad</p>
        `
        alertaDiv.innerHTML = html
    }
    else {
        alertaDiv.style.display = 'none'
    }

}


btnAgregar.addEventListener('click', () => {
    if (input1.value == "") {
        inputCheck = true
        alerta(inputCheck)
    }
    else {
        inputCheck = false
        alerta(inputCheck)
        agregarLista(input1.value)
        renderLista()
    }
})