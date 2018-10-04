function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
}

import hoistStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import { Component, createElement } from 'react';
import Subscription from '../utils/Subscription';
import { storeShape, subscriptionShape } from '../utils/PropTypes';

let count = 0;
var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  var selector = { // wrap the selector in an object that tracks its results between runs.
    run: function runComponentSelector(props) {
      try {

				console.log("%cThis is where state becomes a prop","color:magenta;font-weight:bolder");

				console.groupCollapsed("store.getState()");
          var storeGetStateFirst = store.getState();
          console.log(storeGetStateFirst," --> storeGetStateFirst");
				console.groupEnd();

				console.log("\n");

        console.group/*Collapsed*/(sourceSelector.name+"( (store.getState())",storeGetStateFirst,",(props)",props,")");
          var nextProps = sourceSelector(storeGetStateFirst, props);
          console.log(nextProps," --> nextProps");
        console.groupEnd();

				console.log("\n");

				//if(1 != 1 || false) console.log("IF");else console.log("ELSE")

        if (nextProps !== selector.props || selector.error) {
          console.groupCollapsed("if( (nextProps)",nextProps,"!== (selector.props)",selector.props,"|| (selector.error)",selector.error,")");
            selector.shouldComponentUpdate = true;
            selector.props = nextProps;
            selector.error = null;
            console.log(selector.props," --> selector.props");
          console.groupEnd();
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }

    }
  };
  return selector;
}

export default function connectAdvanced(selectorFactory, ...args) {

    console.log("selectorFactory is the key...that is what we call later to pass in the dispatch function...");

    var _contextTypes, _childContextTypes;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName, getDisplayName = _ref$getDisplayName === undefined ? function (name) {return 'ConnectAdvanced('+name+')'} : _ref$getDisplayName,
      _ref$methodName = _ref.methodName, methodName = _ref$methodName === undefined
      ? 'connectAdvanced' : _ref$methodName, _ref$renderCountProp = _ref.renderCountProp, renderCountProp = _ref$renderCountProp === undefined ? undefined
      : _ref$renderCountProp, _ref$shouldHandleStat = _ref.shouldHandleStateChanges, shouldHandleStateChanges = _ref$shouldHandleStat === undefined
      ? true : _ref$shouldHandleStat, _ref$storeKey = _ref.storeKey, storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey, _ref$withRef = _ref.withRef, withRef = _ref$withRef === undefined ? false : _ref$withRef;

    console.groupCollapsed("_objectWithoutProperties(",_ref,", ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']");
      var connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);
      console.log(connectOptions," --> connectOptions");
    console.groupEnd();
    
    var subscriptionKey = storeKey + 'Subscription';
    var version = hotReloadingVersion++;
    var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
    var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

	  let wrapWithConnect = function wrapWithConnect(WrappedComponent) {

	    console.log("%cThis is where the Component get passed in","color: red; font-weight: bolder");

      invariant(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));
      var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      var displayName = getDisplayName(wrappedComponentName);

      console.groupCollapsed("Object.assign({},",connectOptions,", {getDisplayName, methodName, renderCountProp, shouldHandleStateChanges, storeKey, withRef, displayName, wrappedComponentName, WrappedComponent}");
        var selectorFactoryOptions = Object.assign({}, connectOptions, {getDisplayName, methodName, renderCountProp, shouldHandleStateChanges, storeKey, withRef, displayName, wrappedComponentName, WrappedComponent});
        console.log(selectorFactoryOptions," --> selectorFactoryOptions");
      console.groupEnd();

      console.groupCollapsed("var Connect = function(_Component) {...}("+Component.name+")");

		    var Connect = function (_Component) {

		      console.dir(_Component)

		      console.group/*Collapsed*/("_inherits("+Connect.name+", "+_Component.name+")")
            let inheritRef = _inherits(Connect, _Component);
					  console.log(inheritRef," --> inheritRef");
					console.groupEnd();

          function Connect(props, context) {

            console.log("\n");

            console.groupCollapsed("%cConnect( (props)","color: magenta; font-weight: bolder",props,", (context)",context,")");

              //console.groupCollapsed(_classCallCheck.name+"(",this,", "+Connect.name+")")
                let classCall = _classCallCheck(this, Connect);
                //console.log(classCall," --> classCall");
              //console.groupEnd();

              //console.groupCollapsed(_Component.name+".call( (this)",this,", (props)",props,", (context)",context,")");
                let componentCall = _Component.call(this, props, context)
                //console.log(componentCall+" --> componentCall");
              //console.groupEnd();

              //console.groupCollapsed("_possibleConstructorReturn(",this,",",componentCall,")");
                var _this = _possibleConstructorReturn(this, componentCall);
                //console.log(_this," --> _this (return)");
              //console.groupEnd();

              _this.version = version;
              _this.state = {};
              _this.renderCount = 0;
              _this.store = props[storeKey] || context[storeKey];

              /*
              console.log("\n\n");
						    console.log(_this.state," --> _this.state");
						    console.log(_this.renderCount," --> _this.renderCount");
                console.log(_this.store," --> this.store");
						  console.log("\n\n");
						  */

              _this.propsMode = Boolean(props[storeKey]);
              _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);
              invariant(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

              console.log("\n");

              console.group/*Collapsed*/(_this.constructor.name+".initSelector()");
                let _thisInitSelect = _this.initSelector();
                //console.log(_thisInitSelect," --> _thisInitSelect");
              console.groupEnd();

						  console.log("\n");

              console.groupCollapsed(_this.constructor.name+".initSubscription()");
                let _thisInitSubscription = _this.initSubscription();
                console.log(_thisInitSubscription+" --> _thisInitSubscription");
              console.groupEnd();

              console.log(_this," --> _this (return)");

            console.groupEnd();

            return _this;
          }
          Connect.prototype.getChildContext = function getChildContext() {
            //console.groupCollapsed("%cConnect.getChildContext()","color: magenta; font-weight: bolder");
              var _ref2; // If this component received store from props, its subscription should be transparent to any descendants receiving store+subscription from context; it passes along subscription passed to it. Otherwise, it shadows the parent subscription, which allows Connect to control ordering of notifications to flow top-down.
              var subscription = this.propsMode ? null : this.subscription;
              //console.log(subscription," --> subscription");
              _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
              //console.log(_ref2," --> _ref2 (return)");
            //console.groupEnd();
            return _ref2;
          };
          Connect.prototype.componentDidMount = function componentDidMount() {
            count++;
            if(count === 1) console.log("\n");

            console.groupCollapsed("%cConnect.componentDidMount()","color: magenta; font-weight: bolder");
              if (!shouldHandleStateChanges) {
                console.group/*Collapsed*/("if(!shouldHandleStateChange)");
                  console.log("return");
                console.groupEnd();
								console.groupEnd();
                return;
              }

              // componentWillMount fires during server side rendering, but componentDidMount and componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount. Otherwise, unsubscription would never take place during SSR, causing a memory leak. To handle the case where a child component may have triggered a state change by dispatching an action in its componentWillMount, we have to re-run the select and maybe re-render.

						  console.log("\n");

              console.groupCollapsed(this.constructor.name+".subscription.trySubscribe()");
                let thisSubTry = this.subscription.trySubscribe();
                console.log(thisSubTry," --> thisSubTry");
              console.groupEnd();

						  console.log("\n");

              console.groupCollapsed(this.constructor.name+".selector.run( (this.props)",this.props,")");
                let thisSelRun = this.selector.run(this.props);
                console.log(thisSelRun," --> thisSelRun");
              console.groupEnd();

						  console.log("\n");

              if (this.selector.shouldComponentUpdate) {
                console.groupCollapsed("if(this.selector.shouldComponentUpdate)");
                  console.group/*Collapsed*/(this.constructor.name+".forceUpdate()");
                    let thisForceUpdate = this.forceUpdate();
                  console.groupEnd();
                console.groupEnd();
              } else {
								console.groupCollapsed("else(!this.selector.shouldComponentUpdate)");
								  console.log("Do not call forceUpdate()");
								console.groupEnd();

								console.log("\n");

              }
            console.groupEnd();
          };
          Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            console.log("\n\n\n");
						console.group/*Collapsed*/("Connect.componentWillReceiveProps( (nextProps)",nextProps,")");
              console.group/*Collapsed*/(this.constructor.name+".selector.run( (nextProps)",nextProps,")");
                let thisSelectorRunWillReceiveProps = this.selector.run(nextProps);
                console.log(thisSelectorRunWillReceiveProps," --> thisSelectorRunWillReceiveProps");
              console.groupEnd();
						console.groupEnd();
          };
          Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
						console.log("\n");
						console.groupCollapsed("%cConnect.shouldComponentUpdate()","color: magenta; font-weight: bolder");
						  console.log(this.selector.shouldComponentUpdate+" --> this.selector.shouldComponentUpdate (return)");
						console.groupEnd();
            return this.selector.shouldComponentUpdate;
          };
          Connect.prototype.componentWillUnmount = function componentWillUnmount() {
						console.log("\n");
						console.groupCollapsed("%cConnect.componentWillUnmount()","color: magenta; font-weight: bolder");
							if (this.subscription) {
								console.group/*Collapsed*/("if("+this.subscription.constructor.name+")");
									console.group/*Collapsed*/("this.subscription.tryUnsubscribe()");
										this.subscription.tryUnsubscribe();
									console.groupEnd();
								console.groupEnd();
							}
							this.subscription = null;
							this.notifyNestedSubs = noop;
							this.store = null;
							this.selector.run = noop;
							this.selector.shouldComponentUpdate = false;
						console.groupEnd();
          };
          Connect.prototype.getWrappedInstance = function getWrappedInstance() {
            debugger;
            invariant(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
            return this.wrappedInstance;
          };
          Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
            this.wrappedInstance = ref;
            console.log(this.wrappedInstance," --> this.wrappedInstance = ref");
          };
          Connect.prototype.initSelector = function initSelector() {

            console.groupCollapsed(selectorFactory.name+"( (this.store.dispatch) "+this.store.dispatch.name+", (selectorFactoryOptions)",selectorFactoryOptions,")");
              var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
						  console.log(sourceSelector.name+" --> sourceSelector");
						console.groupEnd();

						console.groupCollapsed(makeSelectorStateful.name+"( (sourceSelector) "+sourceSelector.name+", (this.store)",this.store,")");
              this.selector = makeSelectorStateful(sourceSelector, this.store);
						  console.log(this.selector," --> this.selector");
						console.groupEnd();

						console.group/*Collapsed*/(this.constructor.name+".selector.run( (this.props)",this.props,")");
              let thisSelectorRun = this.selector.run(this.props);
						  console.log(thisSelectorRun," --> thisSelectorRun");
						console.groupEnd();

          };
          Connect.prototype.initSubscription = function initSubscription() {
            if (!shouldHandleStateChanges) return; // parentSub's source should match where store came from: props vs. context. A component connected to the store via props shouldn't use subscription from context, or vice versa.
            var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
            console.group/*Collapsed*/("new Subscription( (this.store)",this.store,", (parentSub)",parentSub,", (this.onStateChange.bind(this).name)",this.onStateChange.bind(this).name,")");
              this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));
              console.log(this.subscription," --> this.subscription");
            console.groupEnd();
            // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in the middle of the notification loop, where `this.subscription` will then be null. An extra null check every change can be avoided by copying the method onto `this` and then replacing it with a no-op on unmount. This can probably be avoided if Subscription's listeners logic is changed to not call listeners that have been unsubscribed in the middle of the notification loop.
            console.group/*Collapsed*/(this.subscription.constructor.name+".notifyNestedSubs.bind(",this.subscription,")");
              this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
              console.log(this.notifyNestedSubs.name+" --> this.notifyNestedSubs");
            console.groupEnd();
          };
          Connect.prototype.onStateChange = function onStateChange() {

            console.log("\n");

            console.group/*Collapsed*/((this ? this.__proto__.constructor.name : this)+".selector.run(",this.props,")");
              let thisSelectRun = this.selector.run(this.props);
						  console.log(thisSelectRun," --> thisSelectRun");
						console.groupEnd();

						console.log("\n");

            if (!this.selector.shouldComponentUpdate) {
              console.group/*Collapsed*/("if(!this.selector.shouldComponentUpdate)");

							  console.log("\n");

                console.group/*Collapsed*/(this.constructor.name+".notifyNestedSubs()");
                  let thisNotifyNested = this.notifyNestedSubs();
                  console.log(thisNotifyNested," --> thisNotifyNested");
                console.groupEnd();

							console.groupEnd();

            }
            else {
							console.group/*Collapsed*/("else(this.selector.shouldComponentUpdate)");
                this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
                console.log(this.componentDidUpdate.name+" --> this.componentDidUpdate");

							  console.log("\n");

                console.group/*Collapsed*/(this.constructor.name+".setState(",dummyState,")");
                  let setDummy = this.setState(dummyState);
                  console.log(setDummy," --> setDummy");
                console.groupEnd();

							console.groupEnd();

            }
          };
          Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
            // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it needs to notify nested subs. Once called, it unimplements itself until further state changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does a boolean check every time avoids an extra method call most of the time, resulting in some perf boost.
            this.componentDidUpdate = undefined;
            console.groupCollapsed(this.constructor.name+".notifyNestedSubs()");
              let thisNoteNestedSubs = this.notifyNestedSubs();
						  console.log(thisNoteNestedSubs," --> thisNoteNestedSubs");
						console.groupEnd();
          };
          Connect.prototype.isSubscribed = function isSubscribed() {
            debugger;
            return Boolean(this.subscription) && this.subscription.isSubscribed();
          };
          Connect.prototype.addExtraProps = function addExtraProps(props) {

						console.log("\n");

            if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) {
              console.group/*Collapsed*/("if(! (withRef)",withRef," && ! (renderCountProp)",renderCountProp," && !( (this.propsMode)",this.propsMode," && (this.subscription)",this.subscription,"))");
                console.log(props," --> props (return)");
              console.groupEnd();
              return props;
						}
            // make a shallow copy so that fields added don't leak to the original selector. this is especially important for 'ref' since that's a reference back to the component instance. a singleton memoized selector would then be holding a reference to the instance, preventing the instance from being garbage collected, and that would be bad
            debugger;
            var withExtras = Object.assign({}, props);
            if (withRef) withExtras.ref = this.setWrappedInstance;
            if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
            if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
            return withExtras;
          };
          Connect.prototype.render = function render() {

            console.groupCollapsed("%cConnect.render()","color: magenta; font-weight: bolder");

              var selector = this.selector;
              selector.shouldComponentUpdate = false;
              if (selector.error) throw selector.error;
              else {

								//console.log("\n");console.log("This is where the *real* ownProps is injected...");console.log("\n");

                console.group/*Collapsed*/(this.constructor.name+".addExtraProps( (selector.props)",selector.props,")");
                  let addExtra = this.addExtraProps(selector.props)
                  console.log(addExtra," --> addExtra ");
                console.groupEnd();

								console.log("\n");

                console.group/*Collapsed*/("createElement( (WrappedComponent) "+WrappedComponent.name+", (addExtra)",addExtra,")");
                  var createEl = createElement(WrappedComponent, addExtra);
                  console.log(createEl," --> createEl (return)");
                console.groupEnd();

								console.groupEnd();
                return createEl;
              }
          };
          return Connect;
		    }(Component);
        console.log(Connect.name+" --> Connect");
      console.groupEnd();

      Connect.WrappedComponent = WrappedComponent;
      Connect.displayName = displayName;
      Connect.childContextTypes = childContextTypes;
      Connect.contextTypes = contextTypes;
      Connect.propTypes = contextTypes;


      return Connect; // originally return hoistStatics(Connect, WrappedComponent);
	};

    return wrapWithConnect;

}