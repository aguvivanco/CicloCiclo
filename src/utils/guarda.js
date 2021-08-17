const guardaFunc={}

const listaOrden =(datos,ind)=>{
	let suma=0
	let indices=[]
	let completo=[]
	for (var i = 0; i < datos.length; i++) {
	completo[i]=[datos[i],i+1]
	suma+=datos[i]
	}
	for (i = 0; i < ind; i++) {
	indices[i]=(completo[i][0]+completo[i+ind][0])*ind/suma
	}
	let resultado=[suma,indices,
	completo]
	return resultado
}

const clickButton = (nombre)=>{
	let valores= sessionStorage.getItem(nombre)
	let lista= valores.split(",")
	let nueva=[]
	for (var i = 0; i < lista.length; i++) {
		nueva.push(parseInt(lista[i]))
	}
	return nueva
}

guardaFunc.listaOrden = listaOrden
guardaFunc.clickButton = clickButton

export {guardaFunc}