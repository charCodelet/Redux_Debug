import compose from './compose';

export default function applyMiddleware() {
    for (var middlewares = Array(arguments.length), _key = 0; _key < arguments.length; _key++) {
      console.group/*Collapsed*/("var _key = 0;",_key,"<",arguments.length+";",_key+")");
        middlewares[_key] = arguments[_key];
        console.log(middlewares[_key].name+" --> middlewares["+_key+"]");
			console.groupEnd();
    }
    let middlewareCreateStore = function middlewareCreateStore(createStore) {
      return function middlewareReturn(reducer, preloadedState, enhancer) {
        console.group/*Collapsed*/(createStore.name+"(",(typeof reducer === "function" ? reducer.name: reducer),", ",preloadedState,", ",enhancer,")");
          var store = createStore(reducer, preloadedState, enhancer);
				  console.log(store," --> store");
				console.groupEnd();
        var _dispatch = store.dispatch;
        console.log("%cThis is where store.dispatch (from createStore) is assigned to _dispatch...","color: darkgreen;font-weight:bolder");
        var chain = [];
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatchMiddleware(action) {
          	console.log("\n");
          	console.log("%cDISPATCH CALLED FROM APPLYMIDDLEWARE","color: blue; font-weight: bolder");
						console.log("\n");
          	//debugger;
            console.group/*Collapsed*/(typeof _dispatch === "function" ? _dispatch.name : _dispatch,"(",(typeof action === "function" ? action.name : action),")");
              let _dispatchRef = _dispatch(action);
              console.log(_dispatchRef," --> _dispatchRef (return)");
            console.groupEnd();
            return _dispatchRef
          }
        };
        chain = middlewares.map(middleware => {
        	console.group/*Collapsed*/(`[${middlewares.map(mid => mid.name).join(", ")}].map(${middleware.name} => {...})`);
						console.group/*Collapsed*/(middleware.name+"( (middlewareAPI)",middlewareAPI," )");
							let midWareAPI = middleware(middlewareAPI);
							console.log(midWareAPI.name+" --> midWareAPI (return)");
						console.groupEnd();
					console.groupEnd();
          return midWareAPI
        });

        console.group/*Collapsed*/(`compose.apply(undefined, [${chain.map(func => func.name).join(", ")}])`);
          _dispatch = compose.apply(undefined, chain);
          console.log(_dispatch.name+" --> _dispatch");
        console.groupEnd();

				console.group/*Collapsed*/(_dispatch.name+"( (store.dispatch) "+store.dispatch.name+")");
				  _dispatch = _dispatch(store.dispatch);
				  console.dir(_dispatch);
				console.groupEnd();

				console.group/*Collapsed*/("Object.assign({} (store)",store,"{dispatch: "+_dispatch.name+"})");
					let objAssign = Object.assign({}, store, {dispatch: _dispatch});
					console.log(objAssign," --> objAssign (return)");
				console.groupEnd();
        return objAssign;
      };
    };
  return middlewareCreateStore;
}