export default function(code){
	const regexp1 = /export default/gim;
	code.replace(regexp1, 'exports.default=');
	const regexp2 = /export\s+{([^}]+)}/gim;
	code.replace(regexp2, function(matchStr, catchStr) {
		let catchVeriates = catchStr.replace('\s', '').split(',');
		let result = '';
		catchVeriates.map((v)=>{
			result += `exports.${v}=${v};`
		});
		return result;
	});
	return code;
}