function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
import verifySubselectors from './verifySubselectors';

export function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  debugger;
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

export function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {

  var areStatesEqual = _ref.areStatesEqual;
  var areOwnPropsEqual = _ref.areOwnPropsEqual;
  var areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {

      state = firstState;
      ownProps = firstOwnProps;
			console.log("%cThis is where state is set: ","color:magenta;font-weight:bolder",state,"--> state = firstState ");
			console.log("%cThis is where ownProps is set: ","color:magenta;font-weight:bolder",ownProps,"--> ownProps = firstOwnProps ");

			console.log("\n");

			console.log("%cmapStateToProps","color:blue;font-weight:bolder");
      console.groupCollapsed(mapStateToProps.name+"( (state)",state,", (ownProps)",ownProps,")");
        stateProps = mapStateToProps(state, ownProps);
		    console.log(stateProps," --> stateProps");
		  console.groupEnd();

			console.log("\n");

			console.log("%cmapDispatchToProps","color:maroon;font-weight:bolder");
      console.group/*Collapsed*/(mapDispatchToProps.name+"( (dispatch) "+dispatch.name+", (ownProps)",ownProps,")");
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
        console.log(dispatchProps," --> dispatchProps");
      console.groupEnd();

			console.log("\n");

			console.log("%cmergeProps (should be called mergePropsANDstate)","color:green;font-weight:bolder");
      console.groupCollapsed(mergeProps.name+"( (stateProps)",stateProps,", (dispatchProps)",dispatchProps,", (ownProps)",ownProps,")");
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        console.log(mergedProps," --> mergedProps (return)");
      console.groupEnd();

      hasRunAtLeastOnce = true;
      console.log((hasRunAtLeastOnce)+" --> hasRunAtLeastOnce");
      console.log(mergedProps," --> mergedProps (return)");

    return mergedProps;
  }
  function handleNewPropsAndNewState() {

		console.log("\n");

    console.group/*Collapsed*/("mapStateToProps( (state)",state,", (ownProps)",ownProps,")")
      stateProps = mapStateToProps(state, ownProps);
		  console.log(stateProps," --> stateProps");
		console.groupEnd();

		console.log("\n");

    if (mapDispatchToProps.dependsOnOwnProps) {

      console.group/*Collapsed*/("if(mapDispatchToProps.dependsOnOwnProps)");

      	console.log("\n");

        console.group/*Collapsed*/("mapDispatchToProps( (dispatch) "+dispatch.name+", (ownProps)",ownProps,")")
          dispatchProps = mapDispatchToProps(dispatch, ownProps);
          console.log(dispatchProps," --> dispatchProps");
        console.groupEnd();

			console.groupEnd();

		}

		console.log("\n");

		console.group/*Collapsed*/("mergeProps( (stateProps)",stateProps,", (dispatchProps)",dispatchProps,", (ownProps)",ownProps,")");
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		  console.log(mergedProps," --> mergedProps (return)");
		console.groupEnd();

    return mergedProps;

  }

  function handleNewProps() {

		console.log("\n");

    if (mapStateToProps.dependsOnOwnProps) {

      console.group/*Collapsed*/("if(mapStateToProps.dependsOnOwnProps)");

				console.log("\n");

        console.group/*Collapsed*/(mapStateToProps.name+"( (state)",state,", (ownProps)",ownProps,")");
          stateProps = mapStateToProps(state, ownProps);
          console.log(stateProps," --> stateProps");
        console.groupEnd();

			console.groupEnd();

		}
    if (mapDispatchToProps.dependsOnOwnProps) {

			console.group/*Collapsed*/("if(mapDispatchToProps.dependsOnOwnProps)");

				console.log("\n");

        console.group/*Collapsed*/("mapDispatchToProps( (dispatch) "+dispatch.name+", (ownProps)",ownProps,")")
          dispatchProps = mapDispatchToProps(dispatch, ownProps);
          console.log(dispatchProps," --> dispatchProps");
        console.groupEnd();

			console.groupEnd();

		}

		console.log("\n");

		console.group/*Collapsed*/(mergeProps.name+"( (stateProps)",stateProps,", (dispatchProps)",dispatchProps,", (ownProps)",ownProps,")")
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		  console.log(mergedProps," --> mergedProps (return)");
		console.groupEnd();

    return mergedProps;

  }
  function handleNewState() {

		console.log("\n");console.log(stateProps," --> stateProps (compare to nextStateProps)");console.log("\n");

    console.group/*Collapsed*/(mapStateToProps.name+"( (state)",(typeof state === 'function' ? state.constructor.name : state),", (ownProps)",ownProps,")")
      var nextStateProps = mapStateToProps(state, ownProps);
      console.log(nextStateProps," --> nextStateProps");
    console.groupEnd();

		console.log("\n");

    console.group/*Collapsed*/("areStatePropsEqual( (nextStateProps)",nextStateProps,", (stateProps)",stateProps,")")
      var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
		  console.log(statePropsChanged," --> statePropsChanged");
		console.groupEnd();

    stateProps = nextStateProps;
    console.log("%cstateProps is set to nextStateProps","color:magenta;font-weight:bolder",stateProps," --> stateProps = nextStateProps");

		console.log("\n");

    if (statePropsChanged) {
      console.group/*Collapsed*/("if(statePropsChanged)");

				console.log("\n");

        console.group/*Collapsed*/(mergeProps.name+"( (stateProps)",stateProps,", (dispatchProps)",dispatchProps,", (ownProps)",ownProps,")")
          mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
          console.log(mergedProps," --> mergedProps (return)");
        console.groupEnd();

			console.groupEnd();

		}
    return mergedProps;
  }
  function handleSubsequentCalls(nextState, nextOwnProps) {

			console.log(ownProps," --> ownProps");
			console.log(nextOwnProps," --> nextOwnProps");
  		console.log((nextOwnProps === ownProps)+" --> nextOwnProps === ownProps");

			console.log("\n");

			console.groupCollapsed(areOwnPropsEqual.name+"( (nextOwnProps)",nextOwnProps,", (ownProps)",ownProps,")");
      	var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
				console.log((propsChanged)+" --> propsChanged (return)");
			console.groupEnd();

			console.log("\n");

			console.groupCollapsed(areStatesEqual.name+"( (nextState)",(typeof nextState === 'function' ? nextState.constructor.name : nextState),", (state)",(typeof state === 'function' ? state.constructor.name : state),")");
      	var stateChanged = !areStatesEqual(nextState, state);
				console.log((stateChanged)+" --> stateChanged (return)");
			console.groupEnd();

      state = nextState;
      ownProps = nextOwnProps;

			console.log("\n");
				console.log("%cstate is set to nextState","color:magenta;font-weight:bolder",state,"--> state = nextState");
				console.log("%cownProps is set to nextOwnProps","color:magenta;font-weight:bolder",ownProps,"--> ownProps = nextOwnProps");
			console.log("\n");

      if (propsChanged && stateChanged) {

				console.group/*Collapsed*/("if( (propsChanged)",propsChanged," && (stateChanged) ",stateChanged,")");

					console.log("\n");

						console.group/*Collapsed*/("handleNewPropsAndNewState();")
							let handleNewPropsAndNewStateRef = handleNewPropsAndNewState();
							console.log(handleNewPropsAndNewStateRef," --> handleNewPropsAndNewStateRef (return)");
						console.groupEnd();

					console.groupEnd()

        return handleNewPropsAndNewStateRef
      }
			else {
				console.group/*Collapsed*/("else( (propsChanged) "+(propsChanged)+" || (stateChanged) "+(stateChanged)+")");
					console.log("Either propsChanged or stateChanged did not change (i.e. one or both are false)");
				console.groupEnd();
			}

			console.log("\n");

      if (propsChanged) {
				console.group/*Collapsed*/("if(propsChanged)");

					console.log("\n");

          console.group/*Collapsed*/("handleNewProps()");
            let handleNewPropsRef = handleNewProps();
            console.log(handleNewPropsRef," --> handleNewPropsRef (return)");
          console.groupEnd();

				console.groupEnd();

        return handleNewPropsRef;
      }
      else {
				console.group/*Collapsed*/("else(!(propsChanged))");
					console.log("props did not change");
				console.groupEnd();
			}

			console.log("\n");

      if (stateChanged) {

				console.group/*Collapsed*/("if(stateChanged)");

					console.log("\n");

				  console.group/*Collapsed*/("handleNewState()")
            let handleNewStateRef = handleNewState();
            console.log(handleNewStateRef," --> handleNewStateRef (return)");
          console.groupEnd();

				console.groupEnd();

        return handleNewStateRef
      }
			else {
				console.group/*Collapsed*/("else(!stateChanged)");
					console.log("state did not change");
				console.groupEnd();
			}
		  console.log(mergedProps," --> mergedProps (return)");
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {

		console.log("\n");

    if(hasRunAtLeastOnce) console.group/*Collapsed*/("handleSubsequentCalls( (nextState)",nextState,", (nextOwnProps)",nextOwnProps,")");
    else console.group/*Collapsed*/("handleFirstCall( (nextState)",nextState,", (nextOwnProps)",nextOwnProps,")");
      let runOnceOrMoreThanOne = hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
      console.log(runOnceOrMoreThanOne," --> runOnceOrMoreThanOne (return)");
    console.groupEnd();
    return runOnceOrMoreThanOne;
  };

}
// If pure is true, the selector returned by selectorFactory will memoize its results, allowing connectAdvanced's shouldComponentUpdate to return false if final props have not changed. If false, the selector will always return a new object and shouldComponentUpdate will always return true.
export default function finalPropsSelectorFactory(dispatch, _ref2) {

  var initMapStateToProps = _ref2.initMapStateToProps;
  var initMapDispatchToProps = _ref2.initMapDispatchToProps;
  var initMergeProps = _ref2.initMergeProps;

  console.groupCollapsed("_objectWithoutProperties(",_ref2," ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']")
  	var options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);
		console.log(options," --> options");
	console.groupEnd();

	console.log("%cThis corresponds to the chosen mapStateToProps returned function","color: blue; font-weight: bolder");
  console.groupCollapsed(initMapStateToProps.name+"( (dispatch) "+dispatch.name+", (options)",options,")");
    var mapStateToProps = initMapStateToProps(dispatch, options);
    console.log(mapStateToProps.name+" --> mapStateToProps");
  console.groupEnd();

	console.log("%cThis corresponds to the chosen mapDispatchToProps returned function","color: maroon; font-weight: bolder");
	console.group/*Collapsed*/(initMapDispatchToProps.name+"( (dispatch) "+dispatch.name+", (options)",options,")");
    var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
	  console.log(mapDispatchToProps.name+" --> mapDispatchToProps");
	console.groupEnd();

	console.log("%cThis corresponds to the chosen mergeProps returned function (this one hardly ever comes into play)","color: green; font-weight: bolder");
	console.groupCollapsed(initMergeProps.name+"( (dispatch) "+dispatch.name+", (options)",options,")");
    var mergeProps = initMergeProps(dispatch, options);
	  console.log(mergeProps.name+" --> mergeProps");
	console.groupEnd();

  if (process.env.NODE_ENV !== 'production') {
		//console.groupCollapsed(verifySubselectors.name+"( (mapStateToProps) "+mapStateToProps.name+", (mapDispatchToProps) "+mapDispatchToProps.name+", (mergeProps) "+mergeProps.name+", (options.displayName) ",options.displayName,")")
      let verifySubSelectorsRef = verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
		  //console.log(verifySubSelectorsRef," --> verifySubSelectorsRef");
		//console.groupEnd();
  }
  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  console.log("\n");

  console.groupCollapsed(selectorFactory.name+"( (mapStateToProps) "+mapStateToProps.name+", (mapDispatchToProps) "+mapDispatchToProps.name+", (mergeProps) "+mergeProps.name+", (dispatch) "+dispatch.name+", (options)",options,")");
    selectorFactory = selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
    console.log(selectorFactory.name+" --> selectorFactory (return)");
  console.groupEnd();

  return selectorFactory
}