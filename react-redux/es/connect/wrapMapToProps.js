import verifyPlainObject from '../utils/verifyPlainObject';

export function wrapMapToPropsConstant(getConstant) {
  //console.log(getConstant.name+" --> getConstant");
  return function initConstantSelector(dispatch, options) {

    console.log("\n");
   
    console.group/*Collapsed*/(getConstant.name+"( (dispatch) "+dispatch.name+", (options)",options,")")
      var constant = getConstant(dispatch, options);
		  console.log(constant," --> constant");
		console.groupEnd();

    function constantSelector() {
      console.log(constant," --> constant (return)");
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

export function getDependsOnOwnProps(mapToProps) {
  if(mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined) console.group/*Collapsed*/("Boolean( (mapToProps.dependsOnOwnProps)",mapToProps.dependsOnOwnProps,")");
  else console.group/*Collapsed*/("mapToProps.length !== 1")
    let mapToPropsDepends = mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
    console.log(mapToPropsDepends," --> mapToPropsDepends (return)");
  console.groupEnd();
  return mapToPropsDepends
}

export function wrapMapToPropsFunc(mapToProps, methodName) {

  return function initProxySelector(dispatch, _ref) {

    var displayName = _ref.displayName;
    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {

			console.log("\n");

      if(proxy.dependsOnOwnProps) console.group/*Collapsed*/(proxy.mapToProps.name+"( (stateOrDispatch) ",typeof stateOrDispatch === 'function' ? stateOrDispatch.name : stateOrDispatch,", (ownProps)",ownProps,") IFIFIFIFIFIFIFIFIFIFIFIFIFIFIFIFIFIFIF");
      else console.group/*Collapsed*/(proxy.mapToProps.name+"((stateOrDispatch)",typeof stateOrDispatch === 'function' ? stateOrDispatch.name : stateOrDispatch,") ELSEELSEELSEELSEELSEELSEELSEELSEELSE ");
        let proxyDepends = proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
        console.log(proxyDepends," --> proxyDepends (return)");
      console.groupEnd();
      return proxyDepends;

    };
    proxy.dependsOnOwnProps = true;
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {

        proxy.mapToProps = mapToProps;

			  console.log("\n");

        console.group/*Collapsed*/("getDependsOnOwnProps( (mapToProps) "+mapToProps.name+")")
          proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
			    console.log(proxy.dependsOnOwnProps," --> proxy.dependsOnOwnProps");
			  console.groupEnd();

			  console.log("\n");

        console.group/*Collapsed*/(proxy.name+"( (stateOrDispatch) ",typeof stateOrDispatch === "function" ? stateOrDispatch.name : stateOrDispatch,", (ownProps)",ownProps,")")
          var props = proxy(stateOrDispatch, ownProps);
          console.log(props," --> props");
        console.groupEnd();

        if (typeof props === 'function') {

					console.log("\n");

          console.group/*Collapsed*/("if(typeof "+props.name+" === 'function')");

            proxy.mapToProps = props;

					  console.log("\n");

            console.group/*Collapsed*/("getDependsOnOwnProps( (props)",props,")");
              proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
              console.log(proxy.dependsOnOwnProps," --> proxy.dependsOnOwnProps");
            console.groupEnd();

					  console.log("\n");

					  console.group/*Collapsed*/(proxy.name+"( (stateOrDispatch)",typeof stateOrDispatch === "function" ? stateOrDispatch.name : stateOrDispatch,", (ownProps)",ownProps,")")
              props = proxy(stateOrDispatch, ownProps);
					    console.log(props," --> props (return)");
					  console.groupEnd();

          console.groupEnd();
        }
        if (process.env.NODE_ENV !== 'production') {

					console.log("\n");

          console.group/*Collapsed*/("verifyPlainObject( (props)",props,", (displayName) "+displayName+", (methodName) "+methodName+")")
            let verifyPlainObj = verifyPlainObject(props, displayName, methodName);
            console.log(verifyPlainObj," --> verifyPlainObj");
          console.groupEnd();

        }
        console.log(props," --> props (return)");
        return props;
    };
    console.log(proxy.name+" --> proxy (return)");
    return proxy;
  };
}