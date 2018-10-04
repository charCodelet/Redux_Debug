function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { storeShape, subscriptionShape } from '../utils/PropTypes';
import warning from '../utils/warning';

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) return;
  didWarnAboutReceivingStore = true;
  warning('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

export function createProvider() {
  var _Provider$childContex;
  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];
  var subscriptionKey = subKey || storeKey + 'Subscription';
  //console.groupCollapsed("var Provider = function (_Component) {...}("+Component.name+")");
    var Provider = function (_Component) {
      //console.group/*Collapsed*/("_inherits("+Provider.name+", "+_Component.name+")");
        let inherits = _inherits(Provider, _Component);
        //console.log(inherits+" --> inherits");
      //console.groupEnd();
      Provider.prototype.getChildContext = function getChildContext() {
        //console.groupCollapsed("Provider.getChildContext()");
          var _ref;
          _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
          //console.log(_ref," --> _ref (return)");
        //console.groupEnd();
        return _ref;
      };
      function Provider(props, context) {
				//console.log("\n");
        //console.groupCollapsed("Provider(",props,",",context,")");
         // console.group/*Collapsed*/("_classCallCheck(",this,", "+Provider.name+")");
            let classCallCheck = _classCallCheck(this, Provider);
            //console.log(classCallCheck+" --> classCallCheck");
          //console.groupEnd();

          //console.group/*Collapsed*/(_Component.name+".call(",this,",",props,", ",context,")");
            let componentCall = _Component.call(this, props, context)
            //console.log(componentCall+" --> componentCall");
          //console.groupEnd();

          //console.group/*Collapsed*/("_possibleConstructorReturn(",this,",",componentCall,")");
            var _this = _possibleConstructorReturn(this, componentCall);
            //console.log(_this," --> _this (return)");
          //console.groupEnd();

          _this[storeKey] = props.store;
          //console.log(_this," --> _this (return)");
        //console.groupEnd();
        return _this;
      }
      Provider.prototype.render = function render() {
        //console.groupCollapsed("Provider render()")
          //console.group/*Collapsed*/(Children,".only(",this.props.children,")")
            let childrenOnly = Children.only(this.props.children);
            //console.log(childrenOnly," --> childrenOnly (return)");
          //console.groupEnd();
				//console.groupEnd();
        return childrenOnly
      };
      return Provider;
    }(Component);
    //console.log(Provider.name+" --> Provider");
  //console.groupEnd();
  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) warnAboutReceivingStore();
    };
  }
  Provider.propTypes = {store: storeShape.isRequired, children: PropTypes.element.isRequired};
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);
  return Provider;
}

export default createProvider();