export default function compose(...args2) {
  //console.log("["+args2.map(arg => arg.name).join(", ")+"] --> args2");
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    console.group/*Collapsed*/("for (var _key = 0;",_key,"<",_len+";",_key+")");
      funcs[_key] = arguments[_key];
      console.log(`[${funcs.map(func => func.name).join(", ")}] --> arguments[${_key}]`);
    console.groupEnd();
	}
  if (funcs.length === 0) {
		console.group/*Collapsed*/("if(funcs.length === 0)");
      function argLengthZero(arg) {
        console.dir(arg);
        return arg;
      };
      console.dir(argLengthZero);
    console.groupEnd();
		return argLengthZero;
	}
  if (funcs.length === 1) {
    console.group/*Collapsed*/("if(",funcs,".length === 1)");
      console.log(funcs[0].name+" --> funcs[0]");
    console.groupEnd();
    return funcs[0];
	}
  // Note the way I used funcs.map (without even a variable) so as to show the names of the functions for the reduce console.groupCollapsed...since it fits in one line, I don't think a function call to abstract this out is even necessary or even desirable...
  return funcs.reduce(function reduceArgument(a, b) {
    console.group/*Collapsed*/(`[${funcs.map(func => func.name).join(", ")}].reduce(function reduceArgument(${a.name}, ${b.name}) {...})`);
      function reduceReturn(...args) { // I changed this to use ...args rather than arguments for second argument of b.apply...

        /*
        console.log("\n");
        console.groupCollapsed(b.name+".apply(undefined,",args,")");
          let bApply = b.apply(undefined, args)
          console.log(bApply.name+" --> bApply");
        console.groupEnd();
        console.log("\n");
        console.groupCollapsed(a.name+"("+bApply.name+")")
          let aApply = a(bApply)
          console.log(aApply," --> aApply (return)");
        console.groupEnd();

        return aApply;

        */

				console.group/*Collapsed*/(a.name+"("+b.name+".apply(undefined,",args,")");
          let abApply = a(b.apply(undefined, args))
          console.log(abApply.name+" --> abApply (return)");
				console.groupEnd();
        return abApply;
      };
      console.dir(reduceReturn);
    console.groupEnd();
    return reduceReturn;
  });
}