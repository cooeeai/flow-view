(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', '../utils/ignoreEvent'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('../utils/ignoreEvent'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.ignoreEvent);
    global.Inspector = mod.exports;
  }
})(this, function (module, exports, _react, _ignoreEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _ignoreEvent2 = _interopRequireDefault(_ignoreEvent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Inspector = function (_Component) {
    _inherits(Inspector, _Component);

    function Inspector() {
      _classCallCheck(this, Inspector);

      return _possibleConstructorReturn(this, (Inspector.__proto__ || Object.getPrototypeOf(Inspector)).apply(this, arguments));
    }

    _createClass(Inspector, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var items = _props.items;
        var view = _props.view;
        var width = _props.width;
        var x = _props.x;
        var y = _props.y;


        // TODO implement multiple item selection.
        var item = null;
        var itemId = null;

        if (items.length === 1) {
          itemId = items[0];

          var link = view.link[itemId];
          var node = view.node[itemId];

          if (link) {
            item = this.renderLink(itemId, link);
          }

          if (node) {
            item = this.renderNode(itemId, node);
          }
        }

        return _react2.default.createElement(
          'foreignObject',
          {
            onDoubleClick: _ignoreEvent2.default,
            onMouseDown: _ignoreEvent2.default,
            onMouseUp: _ignoreEvent2.default,
            width: width,
            x: x,
            y: y
          },
          item
        );
      }
    }, {
      key: 'renderLink',
      value: function renderLink(linkId, link) {
        var deleteLink = this.props.deleteLink;

        return _react2.default.createElement(
          'div',
          null,
          'link',
          _react2.default.createElement(
            'button',
            {
              onClick: function onClick() {
                deleteLink(linkId);
              }
            },
            'delete link'
          )
        );
      }
    }, {
      key: 'renderNode',
      value: function renderNode(nodeId, node) {
        var _props2 = this.props;
        var createInputPin = _props2.createInputPin;
        var createOutputPin = _props2.createOutputPin;
        var deleteNode = _props2.deleteNode;
        var deleteInputPin = _props2.deleteInputPin;
        var deleteOutputPin = _props2.deleteOutputPin;
        var view = _props2.view;


        var ins = node.ins || [];
        var outs = node.outs || [];

        var lastInputPosition = ins.length - 1;
        var lastOutputPosition = outs.length - 1;

        var lastInputIsConnected = false;
        var lastOutputIsConnected = false;

        Object.keys(view.link).forEach(function (linkId) {
          var link = view.link[linkId];

          if (link.to && link.to[0] === nodeId && link.to[1] === lastInputPosition) {
            lastInputIsConnected = true;
          }

          if (link.from[0] === nodeId && link.from[1] === lastOutputPosition) {
            lastOutputIsConnected = true;
          }
        });

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            {
              htmlFor: 'name'
            },
            'node'
          ),
          _react2.default.createElement('input', {
            type: 'text',
            id: 'name',
            disabled: true,
            style: { outline: 'none' },
            value: node.text
          }),
          _react2.default.createElement(
            'div',
            null,
            'ins',
            _react2.default.createElement(
              'button',
              {
                disabled: ins.length === 0 || lastInputIsConnected,
                onClick: function onClick() {
                  deleteInputPin(nodeId);
                }
              },
              '-'
            ),
            _react2.default.createElement(
              'button',
              {
                onClick: function onClick() {
                  createInputPin(nodeId);
                }
              },
              '+'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            'outs',
            _react2.default.createElement(
              'button',
              {
                disabled: outs.length === 0 || lastOutputIsConnected,
                onClick: function onClick() {
                  deleteOutputPin(nodeId);
                }
              },
              '-'
            ),
            _react2.default.createElement(
              'button',
              {
                onClick: function onClick() {
                  createOutputPin(nodeId);
                }
              },
              '+'
            )
          ),
          _react2.default.createElement(
            'button',
            {
              onClick: function onClick() {
                deleteNode(nodeId);
              }
            },
            'delete node'
          )
        );
      }
    }]);

    return Inspector;
  }(_react.Component);

  Inspector.propTypes = {
    createInputPin: _react.PropTypes.func.isRequired,
    createOutputPin: _react.PropTypes.func.isRequired,
    deleteLink: _react.PropTypes.func.isRequired,
    deleteNode: _react.PropTypes.func.isRequired,
    deleteInputPin: _react.PropTypes.func.isRequired,
    deleteOutputPin: _react.PropTypes.func.isRequired,
    items: _react.PropTypes.array.isRequired,
    view: _react.PropTypes.shape({
      link: _react.PropTypes.object.isRequired,
      node: _react.PropTypes.object.isRequired
    }).isRequired,
    width: _react.PropTypes.number.isRequired,
    x: _react.PropTypes.number.isRequired,
    y: _react.PropTypes.number.isRequired
  };

  Inspector.defaultProps = {
    createInputPin: Function.prototype,
    createOutputPin: Function.prototype,
    deleteLink: Function.prototype,
    deleteNode: Function.prototype,
    items: [],
    deleteInputPin: Function.prototype,
    deleteOutputPin: Function.prototype,
    width: 200,
    x: 0,
    y: 0
  };

  exports.default = Inspector;
  module.exports = exports['default'];
});