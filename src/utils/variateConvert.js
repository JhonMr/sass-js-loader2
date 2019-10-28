function arrayConvert(array, str='(') {
	array.map((item, index)=>{
		if(index) str += ',';
		if(item instanceof Array) {
			str += arrayConvert(item);
		}
		else if(item instanceof Object) {
			str += objectConvert(item);
		}
		else
			str += item;
	});
	str += ')'
	return str;
}
function objectConvert(object, str='(') {
	for(let k in object) {
		let item = object[k];
		if(item instanceof Array) {
			str += `${k}: ${arrayConvert(item)}`;
		}
		else if(item instanceof Object) {
			str += `${k}: ${objectConvert(item)}`;
		}
		else
			str += item;
		str += ','
	}
	str += ')'
	return str;
}

export default function(module) {console.log(module)
	let data = module.data,
		convert = '';
	if(module.assignment == 'default'){
		if(data instanceof Array) {
			convert = `${module.variate}: ${arrayConvert(data)}`;
		}
		else if(data instanceof Object) {
			convert = `${module.variate}: ${objectConvert(data)}`;
		}
		else
			convert = `${module.variate}: ${data}`;
	}
	if(module.assignment == 'part') {
		let variate = module.variate;
		variate.map(v=>{
			let key = v.slice(1);
			let value = data.exports[key];
			convert += `${v}: ${value};`;
		})
	}
	return convert;	
}