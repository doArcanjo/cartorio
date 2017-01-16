function schema(){
	return {
		resumeTableHeaders:['Nome','Data óbito','Data Nascimento','Mais','Acções']
	}
}

function viewLayout(){
	return {
		model: 'funerals',
		viewUsageName: 'funerais',
		fields:schema()
	}

}

function componentProperties(){
	return {
		singleItemPath:'/funerals/'
	}
}

export default {
  vl:viewLayout(),cp:componentProperties()
};