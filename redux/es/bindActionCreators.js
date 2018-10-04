function bindActionCreator(actionCreator, dispatch) {

  return function bindActionCreatorReturn(...args) {

		console.log("\n");

    console.groupCollapsed(actionCreator.name+".apply(undefined, (...args)",args,") [bindActionCreators]");
      let actionCreatorApply = actionCreator.apply(undefined, args);
      console.log(typeof actionCreatorApply === "function" ? actionCreatorApply.name : actionCreatorApply," --> actionCreatorApply");
    console.groupEnd();

		console.log("\n");

		console.group/*Collapsed*/(dispatch.name+"( (actionCreatorApply)",JSON.stringify(actionCreatorApply),"))");
      let dispatchActionCreator = dispatch(actionCreatorApply);
      console.log(dispatchActionCreator," --> dispatchActionCreator (return)");
		console.groupEnd();

    return dispatchActionCreator;

  };

}
export default function bindActionCreators(actionCreators, dispatch) {

  console.log("\n");

  console.groupCollapsed("bindActionCreators( (actionCreators)",actionCreators,", (dispatch) "+dispatch.name+")");

	  console.log("\n");

    if (typeof actionCreators === 'function') {
      console.group/*Collapsed*/("if(typeof actionCreators === 'function')");
        console.group/*Collapsed*/("bindActionCreator(",actionCreators,", "+dispatch.name+")");
          let bindActionCreatorRef = bindActionCreator(actionCreators, dispatch);
          console.log(bindActionCreatorRef," --> bindActionCreatorRef (return)");
        console.groupEnd();
      console.groupEnd();
      console.groupEnd();
      return bindActionCreatorRef;
    }
    else {
			console.group/*Collapsed*/("else( (typeof actionCreators) "+typeof actionCreators+" !== 'function')");
        console.log(actionCreators," --> actionCreators");
			console.groupEnd();
    }
    if (typeof actionCreators !== 'object' || actionCreators === null) throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
    var keys = Object.keys(actionCreators);
    var boundActionCreators = {};
    for (var i = 0; i < keys.length; i++) {

			console.log("\n");

      console.group/*Collapsed*/("for (var i = 0;",i,"<",keys.length+";",i+")");
        var key = keys[i];
        var actionCreator = actionCreators[key];
        console.log(actionCreator.name+" --> actionCreators["+key+"]");

			  console.log("\n");

        if (typeof actionCreator === 'function') {
          console.group/*Collapsed*/("if(typeof "+actionCreator.name+" === 'function')");

					  console.log("\n");

            console.group/*Collapsed*/(bindActionCreator.name+"( (actionCreator) "+actionCreator.name+", (dispatch) "+dispatch.name+")");
              boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
              console.log(boundActionCreators," --> boundActionCreators");
              console.log(boundActionCreators[key].name+" --> boundActionCreators["+key+"]");
            console.groupEnd();

          console.groupEnd();
        }

      console.groupEnd();

    }

    console.log(boundActionCreators," --> boundActionCreators (return)");

	console.groupEnd();

  return boundActionCreators;
}