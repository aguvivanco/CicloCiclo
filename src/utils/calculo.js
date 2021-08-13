const reLineal = {};

const calculoDes =(datos,resul)=>{
	let des=[]
	let j=0
	for (var i = 0; i < datos.length; i++) {
		if (j<resul[1].length) {
			des[i] = [resul[2][i][0]/resul[1][j],resul[2][i][1]]
		}else {
		j=0
		des[i]=[resul[2][i][0]/resul[1][j],resul[2][i][1]]
		} 
		j+=1
	}
	return des
}

const sumaVariables = (des)=>{
	let sumXy=0
	let sumX2=0
	let sumY=0
	let sumX=0
	for (var i = 0; i < des.length; i++) {
	let valorMult= des[i][0]*des[i][1]
	sumXy+=valorMult
	sumX2+=(des[i][1]*des[i][1])
	sumY+=des[i][0]
	sumX+=des[i][1]
	}
	let promedioDesY=sumY/(des.length)
	let promedioDesX=sumX/(des.length)
	let resultado=[sumXy,sumX2,sumY,sumX,promedioDesX,promedioDesY,des.length]
	return resultado
	}

const calculoAyb =(va)=>{
	let a= (va[0] - (va[6]*va[4]*va[5]))/(va[1] - (va[6]*va[4]*va[4]))
	let b=va[5]- a* va[4]
	let parametros =[a,b]
	return parametros
}

reLineal.calculoDes = calculoDes;
reLineal.sumaVariables = sumaVariables;
reLineal.calculoAyb = calculoAyb;


export{reLineal}