import {guardaFunc} from "@utils/guarda.js"
import {reLineal} from "@utils/calculo.js"
import "@styles/main.css";


const archivo=document.getElementById(`archivo`);
const boton=document.getElementById(`calcular`);
const numero=document.getElementById(`numero`);
const resulPronostico=document.querySelector(".resultado")

archivo.addEventListener("change",(e)=>{
	const reader= new FileReader();
	reader.readAsText(archivo.files[0]);
	reader.addEventListener("load",(e)=>{
		// Agregar un coso para poner archivos todo el tiempo sin tener que refrescar 
		let cadena= e.currentTarget.result
		let resultado=cadena.split("\r\n")
		let nueva= [];
		for (var i = 0; i < resultado.length; i++) {
			if (isNaN(parseInt(resultado[i])) === false) {
				nueva.push(parseInt(resultado[i]))
				}
			}
		sessionStorage.setItem("nombre",nueva)
		location.reload()
		
		}
	)
})

boton.addEventListener("click",(e)=>{
	let fragmento= document.createDocumentFragment();
	let data= guardaFunc.clickButton("nombre");
	let totalMads=[]
	for (var indice = 1; indice <=data.length/2 ; indice++) {	
		let mads=[]
		let lista= guardaFunc.listaOrden(data,indice) /*Es probable que tenga que sacar esta funcion que esta demas*/
		let desc= reLineal.calculoDes(data,lista)
		let variables= reLineal.sumaVariables(desc)
		let ayB= reLineal.calculoAyb(variables)
		// data,lista, ayb
		let j=0
		let errAbsAc=0
		for (var i = 0; i < data.length; i++) {
			if (j<lista[1].length) {
				let resultado=Math.round((ayB[0]*(i+1)+ayB[1])*lista[1][j])
				let errAbs=Math.abs(data[i]-resultado)
				errAbsAc+=errAbs
				let mad= errAbsAc/(i+1)
				mads.push(mad)
			}else{
				j=0
				let resultado=Math.round((ayB[0]*i+ayB[1])*lista[1][j])
				let errAbs=Math.abs(data[i]-resultado)
				errAbsAc+=errAbs
				let mad= errAbsAc/(i+1)
				mads.push(mad)
			}
			j+=1
		}
		totalMads.push(mads[mads.length-1])
	}
	
	let min=totalMads[0]
	let index=0
	for (var i = 0; i < totalMads.length; i++) {
			if (totalMads[i]<min) {
				min=totalMads[i]
				index=i
			}
		}
	let indiceMejor=index+1
	console.log(totalMads)
	console.log(indiceMejor)
	let lista=guardaFunc.listaOrden(data,indiceMejor) /*Es probable que tenga que sacar esta funcion que esta demas*/
	let desc=reLineal.calculoDes(data,lista)
	let variables=reLineal.sumaVariables(desc)
	let ayB=reLineal.calculoAyb(variables)
	let pronostico=[]
	let j=0
	for (var i = (data.length + 1); i <= (data.length*2); i++) {
		if (j<lista[1].length) {
			let resultado=Math.round((ayB[0]*i+ayB[1])*lista[1][j])
			pronostico.push(resultado)
		}else{
			j=0
			let resultado=Math.round((ayB[0]*i+ayB[1])*lista[1][j])
			pronostico.push(resultado)
		}j+=1
	}
	for (var i = 0; i < pronostico.length; i++) {
		const item=document.createElement("LI")
		if (i=0) {
			item.innerHTML = `<h3>Pronosticos </h3> Pronóstico ${i+1}: ${pronostico[i]}`

		}
		else {item.innerHTML = `Pronóstico ${i+1}: ${pronostico[i]}`}
		
		fragmento.appendChild(item)
	}
	resulPronostico.appendChild(fragmento)
	console.log(pronostico)
})