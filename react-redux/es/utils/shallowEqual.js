var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  console.group/*Collapsed*/("is(",x,",",y,")");
		if (x === y) {
			console.group/*Collapsed*/("if(",x,"===",y,")");
				console.log((x !== 0 || y !== 0 || 1 / x === 1 / y)+" --> x !== 0 || y !== 0 || 1 / x === 1 / y");
			console.groupEnd();
			console.groupEnd();
			return x !== 0 || y !== 0 || 1 / x === 1 / y;
		}
		else {
			console.group/*Collapsed*/("if(",x,"!==",y,")");
				console.log((x !== x && y !== y)+" --> x !== x && y !== y");
			console.groupEnd();
			console.groupEnd();
			return x !== x && y !== y;
		}
}
export default function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
      console.group/*Collapsed*/("if(is(objA, objB))")
			  console.log("true");
			console.groupEnd();
      return true;
    }
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      console.group/*Collapsed*/("if(typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null)");
			  console.log("false");
      console.groupEnd();
      return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    console.log(keysA," --> keysA");
	  console.log(keysB," --> keysB");
    if (keysA.length !== keysB.length) {
      console.group/*Collapsed*/("if("+keysA.length+" !== "+keysB.length+")")
			  console.log("false");
      console.groupEnd();
      return false;
    }
    for (var i = 0; i < keysA.length; i++) {
      console.group/*Collapsed*/("for (var i = 0;",i,"<",keysA.length+";",i+")");
        if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
          console.group/*Collapsed*/("if(!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]]))")
            console.log("false");
          console.groupEnd();
					console.groupEnd();
          return false;
        }
      console.groupEnd();
		}
    console.log("true");
  return true;
}