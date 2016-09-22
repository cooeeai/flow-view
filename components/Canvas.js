(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', 'react-dom', '../utils/computeNodeWidth', './Link', './Node', './theme', '../utils/ignoreEvent', './Inspector', '../utils/xOfPin', './Selector'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('react-dom'), require('../utils/computeNodeWidth'), require('./Link'), require('./Node'), require('./theme'), require('../utils/ignoreEvent'), require('./Inspector'), require('../utils/xOfPin'), require('./Selector'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.reactDom, global.computeNodeWidth, global.Link, global.Node, global.theme, global.ignoreEvent, global.Inspector, global.xOfPin, global.Selector);
    global.Canvas = mod.exports;
  }
})(this, function (module, exports, _react, _reactDom, _computeNodeWidth, _Link, _Node, _theme, _ignoreEvent, _Inspector, _xOfPin, _Selector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _computeNodeWidth2 = _interopRequireDefault(_computeNodeWidth);

  var _Link2 = _interopRequireDefault(_Link);

  var _Node2 = _interopRequireDefault(_Node);

  var _theme2 = _interopRequireDefault(_theme);

  var _ignoreEvent2 = _interopRequireDefault(_ignoreEvent);

  var _Inspector2 = _interopRequireDefault(_Inspector);

  var _xOfPin2 = _interopRequireDefault(_xOfPin);

  var _Selector2 = _interopRequireDefault(_Selector);

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

  var Canvas = function (_Component) {
    _inherits(Canvas, _Component);

    function Canvas(props) {
      _classCallCheck(this, Canvas);

      var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

      _this.state = {
        draggedLink: null,
        draggedItems: [],
        pointer: null,
        showSelector: false,
        selectedItems: []
      };
      return _this;
    }

    _createClass(Canvas, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var container = (0, _reactDom.findDOMNode)(this).parentNode;

        var offset = {
          x: container.offsetLeft,
          y: container.offsetTop
        };

        this.setState({ offset: offset });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props;
        var createLink = _props.createLink;
        var _createNode = _props.createNode;
        var deleteLink = _props.deleteLink;
        var dragItems = _props.dragItems;
        var fontFamily = _props.fontFamily;
        var fontSize = _props.fontSize;
        var height = _props.height;
        var item = _props.item;
        var lineWidth = _props.lineWidth;
        var nodeBodyHeight = _props.nodeBodyHeight;
        var pinSize = _props.pinSize;
        var style = _props.style;
        var updateLink = _props.updateLink;
        var view = _props.view;
        var width = _props.width;
        var _state = this.state;
        var draggedItems = _state.draggedItems;
        var draggedLink = _state.draggedLink;
        var offset = _state.offset;
        var pointer = _state.pointer;
        var selectedItems = _state.selectedItems;
        var showSelector = _state.showSelector;


        var Link = item.link.DefaultLink;
        var Node = item.node.DefaultNode;

        var setState = this.setState.bind(this);

        var getCoordinates = function getCoordinates(e) {
          return {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
          };
        };

        var onClick = function onClick(e) {
          e.preventDefault();
          e.stopPropagation();

          setState({
            showSelector: false
          });
        };

        var onCreateLink = function onCreateLink(link) {
          var id = createLink(link);

          link.id = id;

          setState({
            draggedLink: link
          });
        };

        var onUpdateLink = function onUpdateLink(id, link) {
          updateLink(id, link);

          link.id = id;

          setState({
            draggedLink: link
          });
        };

        var onDoubleClick = function onDoubleClick(e) {
          e.preventDefault();
          e.stopPropagation();

          setState({
            pointer: getCoordinates(e),
            showSelector: true
          });
        };

        var onMouseDown = function onMouseDown(e) {
          e.preventDefault();
          e.stopPropagation();

          // TODO CTRL key for multiple selection.

          setState({
            selectedItems: []
          });
        };

        var onMouseLeave = function onMouseLeave(e) {
          e.preventDefault();
          e.stopPropagation();

          var draggedLink = _this2.state.draggedLink;
          if (draggedLink) deleteLink(draggedLink.id);

          setState({
            draggedItems: [],
            draggedLink: null,
            pointer: null,
            showSelector: false
          });
        };

        var onMouseMove = function onMouseMove(e) {
          e.preventDefault();
          e.stopPropagation();

          var nextPointer = getCoordinates(e);

          setState({
            pointer: nextPointer
          });

          var draggedItems = _this2.state.draggedItems;

          if (draggedItems.length > 0) {
            var draggingDelta = {
              x: pointer ? nextPointer.x - pointer.x : 0,
              y: pointer ? nextPointer.y - pointer.y : 0
            };

            dragItems(draggingDelta, draggedItems);
          }
        };

        var onMouseUp = function onMouseUp(e) {
          e.preventDefault();
          e.stopPropagation();

          var draggedLink = _this2.state.draggedLink;
          if (draggedLink) deleteLink(draggedLink.id);

          setState({
            draggedLink: null,
            selectedItems: [],
            pointer: null
          });
        };

        /**
         * Bring up selected nodes.
         */

        var selectedFirst = function selectedFirst(a, b) {
          // FIXME it works, but it would be nice if the selected
          // items keep being up after deselection.
          var aIsSelected = selectedItems.indexOf(a) > -1;
          var bIsSelected = selectedItems.indexOf(b) > -1;

          if (aIsSelected && bIsSelected) return 0;

          if (aIsSelected) return 1;
          if (bIsSelected) return -1;
        };

        var selectItem = function selectItem(id) {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Do not select items when releasing a dragging link.

            var draggedLink = _this2.state.draggedLink;

            if (draggedLink) {
              deleteLink(draggedLink.id);

              setState({
                draggedLink: null
              });

              return;
            }

            var selectedItems = Object.assign([], _this2.state.selectedItems);

            var index = selectedItems.indexOf(id);

            if (index === -1) {
              selectedItems = [id];
              // TODO if CTRL key pressed: selectedItems.push(id)
            } else {
              selectedItems.splice(index, 1);
            }

            setState({
              draggedItems: [],
              selectedItems: selectedItems
            });
          };
        };

        var willDragItem = function willDragItem(id) {
          return function (e) {
            e.preventDefault();
            e.stopPropagation();

            var draggedItems = Object.assign([], _this2.state.draggedItems);

            var index = draggedItems.indexOf(id);

            if (index === -1) {
              draggedItems = [id];
              // TODO if CTRL key pressed: draggedItems.push(id)
            }

            setState({
              draggedItems: draggedItems,
              selectedItems: []
            });
          };
        };

        return _react2.default.createElement(
          'svg',
          {
            fontFamily: fontFamily,
            fontSize: fontSize,
            height: height,
            onClick: onClick,
            onDoubleClick: onDoubleClick,
            onMouseDown: onMouseDown,
            onMouseEnter: _ignoreEvent2.default,
            onMouseLeave: onMouseLeave,
            onMouseMove: onMouseMove,
            onMouseUp: onMouseUp,
            textAnchor: 'start',
            style: style,
            width: width
          },
          _react2.default.createElement(_Inspector2.default, {
            selectedItems: selectedItems,
            height: height
          }),
          Object.keys(view.node).sort(selectedFirst).map(function (id, i) {
            var _view$node$id = view.node[id];
            var height = _view$node$id.height;
            var ins = _view$node$id.ins;
            var outs = _view$node$id.outs;
            var text = _view$node$id.text;
            var width = _view$node$id.width;
            var x = _view$node$id.x;
            var y = _view$node$id.y;


            return _react2.default.createElement(Node, {
              key: i,
              dragged: draggedItems.indexOf(id) > -1,
              draggedLink: draggedLink,
              fontSize: fontSize,
              height: height,
              id: id,
              ins: ins,
              onCreateLink: onCreateLink,
              outs: outs,
              pinSize: pinSize,
              selected: selectedItems.indexOf(id) > -1,
              selectNode: selectItem(id),
              text: text,
              updateLink: updateLink,
              width: width,
              willDragNode: willDragItem(id),
              x: x,
              y: y
            });
          }),
          Object.keys(view.link).map(function (id, i) {
            var _view$link$id = view.link[id];
            var from = _view$link$id.from;
            var to = _view$link$id.to;


            var x1 = null;
            var y1 = null;
            var x2 = null;
            var y2 = null;

            var nodeIds = Object.keys(view.node);
            var idEquals = function idEquals(x) {
              return function (id) {
                return id === x[0];
              };
            };
            var sourceId = from ? nodeIds.find(idEquals(from)) : null;
            var targetId = to ? nodeIds.find(idEquals(to)) : null;

            var computedWidth = null;

            if (sourceId) {
              var source = view.node[sourceId];

              computedWidth = (0, _computeNodeWidth2.default)({
                bodyHeight: nodeBodyHeight, // TODO custom nodes height
                pinSize: pinSize,
                fontSize: fontSize,
                text: source.text,
                width: source.width
              });

              x1 = source.x + (0, _xOfPin2.default)(pinSize, computedWidth, source.outs.length, from[1]);
              y1 = source.y + pinSize + nodeBodyHeight;
            }

            if (targetId) {
              var target = view.node[targetId];

              computedWidth = (0, _computeNodeWidth2.default)({
                bodyHeight: nodeBodyHeight, // TODO custom nodes height
                pinSize: pinSize,
                fontSize: fontSize,
                text: target.text,
                width: target.width
              });

              x2 = target.x + (0, _xOfPin2.default)(pinSize, computedWidth, target.ins.length, to[1]);
              y2 = target.y;
            } else {
              // FIXME at first, pointer is null. This trick works, but,
              // it should be reviosioned when implementing creating links
              // in the opposite direction.
              x2 = pointer ? pointer.x - pinSize / 2 : x1;
              y2 = pointer ? pointer.y - pinSize : y1;
            }

            return _react2.default.createElement(Link, {
              key: i,
              from: from,
              lineWidth: lineWidth,
              id: id,
              onCreateLink: onCreateLink,
              onUpdateLink: onUpdateLink,
              pinSize: pinSize,
              selected: selectedItems.indexOf(id) > -1,
              selectLink: selectItem(id),
              to: to,
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2
            });
          }),
          _react2.default.createElement(_Selector2.default, {
            createNode: function createNode(node) {
              _createNode(node);

              // TODO It should be better to have emit('createNode', node)
              // in the Selector and
              // on('createNode', () => {
              //   setState({ showSelector: false })
              // })
              // in the Canvas.

              // Need to change state to force React rendering.
              setState({
                showSelector: false
              });
            },
            fontFamily: fontFamily,
            pointer: pointer,
            show: showSelector
          })
        );
      }
    }]);

    return Canvas;
  }(_react.Component);

  Canvas.propTypes = {
    createLink: _react.PropTypes.func.isRequired,
    createNode: _react.PropTypes.func.isRequired,
    deleteLink: _react.PropTypes.func.isRequired,
    dragItems: _react.PropTypes.func.isRequired,
    fontFamily: _react.PropTypes.string.isRequired,
    fontSize: _react.PropTypes.number.isRequired,
    height: _react.PropTypes.number.isRequired,
    item: _react.PropTypes.shape({
      link: _react.PropTypes.object.isRequired,
      node: _react.PropTypes.object.isRequired
    }).isRequired,
    nodeBodyHeight: _react.PropTypes.number.isRequired,
    lineWidth: _react.PropTypes.number.isRequired,
    pinSize: _react.PropTypes.number.isRequired,
    style: _react.PropTypes.object.isRequired,
    updateLink: _react.PropTypes.func.isRequired,
    view: _react.PropTypes.shape({
      link: _react.PropTypes.object.isRequired,
      node: _react.PropTypes.object.isRequired
    }).isRequired,
    width: _react.PropTypes.number.isRequired
  };

  Canvas.defaultProps = {
    createLink: Function.prototype,
    createNode: Function.prototype,
    deleteLink: Function.prototype,
    dragItems: Function.prototype,
    fontFamily: _theme2.default.fontFamily,
    fontSize: 17, // FIXME fontSize seems to be ignored
    height: 400,
    item: {
      link: { DefaultLink: _Link2.default },
      node: { DefaultNode: _Node2.default }
    },
    lineWidth: _theme2.default.lineWidth,
    nodeBodyHeight: _theme2.default.nodeBodyHeight,
    pinSize: _theme2.default.pinSize,
    style: { border: '1px solid black' },
    updateLink: Function.prototype,
    view: {
      link: {},
      node: {}
    },
    width: 400
  };

  exports.default = Canvas;
  module.exports = exports['default'];
});