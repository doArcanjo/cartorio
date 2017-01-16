function schema(){
	return {
		resumeTableHeaders:['Ano','N.º','Registo','Nome','Data inscrição','Data baptismo']
	}
}

function viewLayout(){
	return {
		model: 'baptisms',
		viewUsageName: 'baptismos',
		fields:schema()
	}

}

function componentProperties(){
	return {
		singleItemPath:'/baptisms/'
	}
}

export default {
  vl:viewLayout(),cp:componentProperties()
};