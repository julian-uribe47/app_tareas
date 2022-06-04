const fs = require("fs");
const archivoTareas ={
    leerJSON:function(){
        const tareas = fs.readFileSync("tareas.json","utf-8");
        return JSON.parse(tareas);
        
    }

}
let escribirJSON = (nuevasTareas) => {
    let tareasString = JSON.stringify(nuevasTareas);
    fs.writeFileSync("./tareas.json", tareasString, "utf-8");
}
let guardarTarea = (unaTarea) => {
    let tareasActuales = archivoTareas.leerJSON();
    tareasActuales.push(unaTarea);
    escribirJSON(tareasActuales);
}

let leerPorEstado = (filestado) => {
    let tareasEnJson = archivoTareas.leerJSON();
    let tareasFilt = tareasEnJson.filter(tarea => {
        return tarea.estado == filestado;
    })
    return tareasFilt;
}


const opcion = process.argv[2]

let imprimirTareas = (tareas) => {
    tareas.forEach((tarea,pos) => {
        console.log(`${pos + 1}. ${tarea.titulo} - ${tarea.estado}`);   
    });
}


const lista2 = () => {
    switch (opcion) {
        case "listar":
            let tareas = archivoTareas.leerJSON();
            imprimirTareas(tareas);
            break;
        case undefined:
            console.log("Atención - Tienes que pasar una acción");
            break;
        case "crear":
            let tituloTarea = process.argv[3];
            let tareaNueva = {titulo: tituloTarea, estado: "pendiente"};
            guardarTarea(tareaNueva);
            break;    
        case "filtrar":
            let estadoFiltrado = process.argv[3];
            let tareasFiltradas = leerPorEstado(estadoFiltrado)
            imprimirTareas(tareasFiltradas);
            break;
            
        default:
            console.log("No entiendo que quieres hacer");
            break;
    }
}

module.exports = lista2