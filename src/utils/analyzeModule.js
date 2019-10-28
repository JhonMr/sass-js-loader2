
const importReg = /(import\s+{([^}]+)}\s+from\s+("([^\s]+)"|'([^\s]+)'))|(import\s+(([^\s]+)\s+from\s+("([^\s]+)"|'([^\s]+)')))/gim;

function analyzeModule(source){
	const modules = [];
	let regexpResult = null;
	do {
	  regexpResult = importReg.exec(source);
	  if (!regexpResult) continue;
		
		let module;
		// import {...} from "";
		if(regexpResult[1]) {
			let variate = regexpResult[2].replace(/\s/g,'').split(',');
			module = {
			  string: regexpResult[0],
			  path: regexpResult[4] || regexpResult[5],
			  variate: variate,
			  assignment: 'part'
			};
		}
		// import .. from "";
		if(regexpResult[6]) {
			module = {
			  string: regexpResult[0],
			  path: regexpResult[10] || regexpResult[11],
			  variate: regexpResult[8],
			  assignment: 'default'
			};
		}
		// import * as ... from "";
		// todo
	  modules.push(module);
	} while (regexpResult);
	
	return modules
}

export default analyzeModule