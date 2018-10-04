import isPlainObject from 'lodash-es/isPlainObject';
export var ActionTypes = {INIT: '@@redux/INIT'};

export default function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    console.groupCollapsed("if(typeof preloadedState === 'function' && typeof enhancer === 'undefined')");
      enhancer = preloadedState;
      preloadedState = undefined;
      console.log(enhancer.name+" --> enhancer");
      console.log(preloadedState+" --> preloadedState");
    console.groupEnd();
  }
  else {
		console.group/*Collapsed*/("else( (typeof preloadedState)",typeof preloadedState," !== 'function' || (typeof enhancer)",typeof enhancer," !== 'undefined')");
      console.log("Keep going...'")
		console.groupEnd();
  }
  if (typeof enhancer !== 'undefined') {
    console.group/*Collapsed*/("if(typeof "+enhancer.name+" !== 'undefined')");

      if (typeof enhancer !== 'function') throw new Error('Expected the enhancer to be a function.');

      /*
      console.groupCollapsed(enhancer.name+"("+createStore.name+")");
        let enhancerCreateStore = enhancer(createStore)
        console.log(enhancerCreateStore.name+" --> enhancerCreateStore");
      console.groupEnd();
      */

      //console.group/*Collapsed*/(enhancerCreateStore.name+"( (reducer) "+reducer.name+", (preloadedState)",preloadedState,")");
		  console.group/*Collapsed*/(enhancer.name+"("+createStore.name+")( (reducer) "+reducer.name+", (preloadedState)",preloadedState,")");
        let enhancerCreateStore = /*enhancerCreateStore*/enhancer(createStore)(reducer, preloadedState);
        console.log(enhancerCreateStore," --> enhancerCreateStore (return)");
      console.groupEnd();

		console.groupEnd();

    return enhancerCreateStore
  }
  else {
		console.group/*Collapsed*/("else( (typeof enhancer)",typeof enhancer," === 'undefined')");
		  console.log("Keep going...to createStore dispatch method...'")
		console.groupEnd();
  }
  if (typeof reducer !== 'function') throw new Error('Expected the reducer to be a function.');
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    //let arr = ["test","bear"];
    //console.log(arr.slice()," --> slice"); // makes a copy
    if (nextListeners === currentListeners) nextListeners = currentListeners.slice();
  }
	function getState() {
		return currentState;
	}
  function subscribe(listener) {

    if (typeof listener !== 'function') throw new Error('Expected listener to be a function.');
    var isSubscribed = true;
    ensureCanMutateNextListeners();

		console.log("\n");

    console.group/*Collapsed*/("nextListeners.push( (listener) "+listener.name+") [createStore]");
      nextListeners.push(listener);
		  console.log(nextListeners.map(nextListen => nextListen.name)+" --> nextListeners");
		console.groupEnd();

    return function unsubscribe() {
      if (!isSubscribed) return;
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  function dispatch(action, theDispatchMethodFromCreateStore) {

    if (!isPlainObject(action)) throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    if (typeof action.type === 'undefined') throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    if (isDispatching) throw new Error('Reducers may not dispatch actions.');
    try {
      isDispatching = true;
			console.log("%cDISPATCHED REDUCER IN CREATESTORE","color: rebeccapurple; font-weight:bold; font-size:16px;");
      console.groupCollapsed(currentReducer.name+"((currentState)",currentState,", (action)",action,")")
        currentState = currentReducer(currentState, action);
        console.log(currentState," --> currentState");
      console.groupEnd();
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    console.log(`[${listeners.map(listen => listen.name).join(", ")}] --> listeners`);
    if(listeners.length === 0) console.log("Skip the for loop");
    else console.log("\n");
    for (var i = 0; i < listeners.length; i++) {
			if(i === 0) console.log("%cSUBSCRIBED METHOD","color: maroon;font-weight:bold;font-size:16px;");

			console.log("\n");

      console.group/*Collapsed*/("for (var i = 0;",i,"<",listeners.length+";",i+")");

			  console.log("\n");

        console.group/*Collapsed*/(listeners[i].name+"()");
          listeners[i]();
          console.log(listeners[i].name+" --> listeners["+i+"].name");
        console.groupEnd();
			console.groupEnd();
    }
    console.log(action," --> action (return)");
    return action;
  }
	console.log("%cINITIAL DISPATCH","color: mediumvioletred;font-weight:bold;font-size: 16px;");
  console.group/*Collapsed*/("dispatch({type: "+ActionTypes.INIT+"})");
    let dispatchCreateStore = dispatch({ type: ActionTypes.INIT });
    console.log(dispatchCreateStore," --> dispatchCreateStore");
  console.groupEnd();
  return _ref2 = {dispatch, subscribe, getState, constructor: "createStore"}, _ref2;
}