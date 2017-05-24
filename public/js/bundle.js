(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatPanelActions = function ChatPanelActions() {
  _classCallCheck(this, ChatPanelActions);

  this.generateActions('updateUsername', 'updateText', 'updateOnlineUsers', 'updateMessages', 'addMessage', 'clearText');
};

exports.default = _alt2.default.createActions(ChatPanelActions);

},{"../alt":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GrumbleFormActions = function () {
    function GrumbleFormActions() {
        _classCallCheck(this, GrumbleFormActions);

        this.generateActions('updateText', 'updateAnnoyanceLevel', 'addGrumbleSuccess', 'addGrumbleFail');
    }

    _createClass(GrumbleFormActions, [{
        key: 'addGrumble',
        value: function addGrumble(username, text, annoyanceLevel) {
            var _this = this;

            $.ajax({
                type: 'POST',
                url: '/api/grumble',
                data: {
                    username: username,
                    text: text,
                    annoyanceLevel: annoyanceLevel
                }
            }).done(function (data) {
                _this.actions.addGrumbleSuccess(data.message);
            }).fail(function (data) {
                _this.actions.addGrumbleFail(data.message);
            });
        }
    }]);

    return GrumbleFormActions;
}();

exports.default = _alt2.default.createActions(GrumbleFormActions);

},{"../alt":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GrumbleStreamActions = function () {
    function GrumbleStreamActions() {
        _classCallCheck(this, GrumbleStreamActions);

        this.generateActions('getGrumblesSuccess', 'getGrumblesFail', 'updateCommentFormUsername', 'updateCommentFormText', 'incrementNewGrumbleCount', 'hideComments');
    }

    _createClass(GrumbleStreamActions, [{
        key: 'getGrumbles',
        value: function getGrumbles() {
            var _this = this;

            $.ajax({ url: '/api/grumbles' }).done(function (data) {
                _this.actions.getGrumblesSuccess(data);
            }).fail(function (data) {
                console.log('fail');
            });
        }
    }, {
        key: 'updateGrumbles',
        value: function updateGrumbles(count) {
            var _this2 = this;

            console.log('get.. ' + count);
            $.ajax({
                type: 'POST',
                url: '/api/grumbles/more',
                data: {
                    count: count
                }
            }).done(function (data) {
                _this2.actions.getGrumblesSuccess(data);
            }).fail(function (data) {
                console.log('fail');
            });
        }
    }, {
        key: 'addComment',
        value: function addComment(grumbleId, username, text) {
            var _this3 = this;

            $.ajax({
                type: 'PUT',
                url: '/api/grumble/comment',
                data: {
                    grumbleId: grumbleId,
                    username: username,
                    text: text
                }
            }).done(function () {
                console.log('success');
                _this3.actions.getGrumbles();
            }).fail(function () {});
        }
    }]);

    return GrumbleStreamActions;
}();

exports.default = _alt2.default.createActions(GrumbleStreamActions);

},{"../alt":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeActions = function HomeActions() {
  _classCallCheck(this, HomeActions);

  this.generateActions('updateUsername', 'updateNewGrumbleCount');
};

exports.default = _alt2.default.createActions(HomeActions);

},{"../alt":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginActions = function LoginActions() {
  _classCallCheck(this, LoginActions);

  this.generateActions('updateUsername', 'updatePassword');
};

exports.default = _alt2.default.createActions(LoginActions);

},{"../alt":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupActions = function SignupActions() {
  _classCallCheck(this, SignupActions);

  this.generateActions('updateUsername', 'updatePassword');
};

exports.default = _alt2.default.createActions(SignupActions);

},{"../alt":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Navbar2.default, { history: this.props.history }),
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

},{"./Footer":11,"./Navbar":16,"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChatPanelStore = require('../stores/ChatPanelStore');

var _ChatPanelStore2 = _interopRequireDefault(_ChatPanelStore);

var _ChatPanelActions = require('../actions/ChatPanelActions');

var _ChatPanelActions2 = _interopRequireDefault(_ChatPanelActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatPanel = function (_React$Component) {
    _inherits(ChatPanel, _React$Component);

    function ChatPanel(props) {
        _classCallCheck(this, ChatPanel);

        var _this = _possibleConstructorReturn(this, (ChatPanel.__proto__ || Object.getPrototypeOf(ChatPanel)).call(this, props));

        _this.state = _ChatPanelStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(ChatPanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _ChatPanelStore2.default.listen(this.onChange);

            var socket = io();

            socket.on('onlineUsers', function (data) {
                _ChatPanelActions2.default.updateOnlineUsers(data);
            });

            socket.on('startMessages', function (messages) {
                if (_this2.state.messages.length === 0) _ChatPanelActions2.default.updateMessages(messages);
            });

            socket.on('chatMessage', function (message) {
                _ChatPanelActions2.default.addMessage(message);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _ChatPanelStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            var message = {
                username: this.state.username.trim(),
                text: this.state.text.trim()
            };

            if (message.username && message.text) {
                var socket = io.connect();
                socket.emit('chatMessage', message);
            }

            _ChatPanelActions2.default.clearText();
        }
    }, {
        key: 'render',
        value: function render() {
            var messages = this.state.messages.map(function (message, index) {
                return _react2.default.createElement(
                    'div',
                    { key: index, className: 'message' },
                    _react2.default.createElement(
                        'div',
                        { className: 'chat-username' },
                        message.username
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'chat-text' },
                        message.text
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'chat-panel' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-title' },
                    'Chat'
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'users-count' },
                    ' ',
                    this.state.onlineUsers,
                    ' users are here'
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'chat-content' },
                    messages
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'new-message' },
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.handleSubmit.bind(this), className: 'pure-form pure-form-stacked message-form' },
                        _react2.default.createElement('input', { id: 'new-message-username', value: this.state.username, onChange: _ChatPanelActions2.default.updateUsername, placeholder: 'Username', required: true }),
                        _react2.default.createElement('textarea', { id: 'new-message-text', value: this.state.text, onChange: _ChatPanelActions2.default.updateText, className: 'input-grumble-text', rows: '2', placeholder: 'Message', reqired: true }),
                        _react2.default.createElement(
                            'button',
                            { id: 'sent-message-btn', type: 'submit', className: 'pure-button pure-button-primary' },
                            'Send'
                        )
                    )
                )
            );
        }
    }]);

    return ChatPanel;
}(_react2.default.Component);

exports.default = ChatPanel;

},{"../actions/ChatPanelActions":1,"../stores/ChatPanelStore":20,"react":"react"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CommentForm(props) {
    return _react2.default.createElement(
        "form",
        { className: "pure-form comment-form", onSubmit: props.handleSubmit },
        _react2.default.createElement(
            "div",
            { className: "comment-form-top" },
            _react2.default.createElement("input", { className: "input-comment-username", value: props.values.username, onChange: props.onChangeUsername, placeholder: "Username", required: true }),
            _react2.default.createElement(
                "button",
                { type: "submit", className: "pure-button pure-button-primary submit-comment-btn" },
                "Submit Comment"
            )
        ),
        _react2.default.createElement("textarea", { value: props.values.text, onChange: props.onChangeText, className: "input-comment-text", rows: "2", placeholder: "Comment", required: true })
    );
}

exports.default = CommentForm;

},{"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'footer',
        null,
        'I am footer.'
      );
    }
  }]);

  return Footer;
}(_react2.default.Component);

exports.default = Footer;

},{"react":"react","react-router":"react-router"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GrumbleFormStore = require('../stores/GrumbleFormStore');

var _GrumbleFormStore2 = _interopRequireDefault(_GrumbleFormStore);

var _GrumbleFormActions = require('../actions/GrumbleFormActions');

var _GrumbleFormActions2 = _interopRequireDefault(_GrumbleFormActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GrumbleForm = function (_React$Component) {
    _inherits(GrumbleForm, _React$Component);

    function GrumbleForm(props) {
        _classCallCheck(this, GrumbleForm);

        var _this = _possibleConstructorReturn(this, (GrumbleForm.__proto__ || Object.getPrototypeOf(GrumbleForm)).call(this, props));

        _this.state = _GrumbleFormStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(GrumbleForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _GrumbleFormStore2.default.listen(this.onChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _GrumbleFormStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            var username = this.props.username.trim();
            var text = this.state.text.trim();
            var annoyanceLevel = this.state.annoyanceLevel;
            if (username && text) {
                _GrumbleFormActions2.default.addGrumble(username, text, annoyanceLevel);

                var socket = io.connect();
                socket.emit('newGrumble', this.props.username);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'user-grumble' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-title' },
                    'New Grumble'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'new-grumble-panel' },
                    _react2.default.createElement(
                        'form',
                        { className: 'pure-form pure-form-stacked', onSubmit: this.handleSubmit.bind(this) },
                        _react2.default.createElement(
                            'label',
                            { className: 'input-label' },
                            'Username'
                        ),
                        _react2.default.createElement('input', { value: this.props.username, onChange: this.props.handleUsernameChange, required: true }),
                        _react2.default.createElement(
                            'label',
                            { className: 'input-label' },
                            'Grumble Text'
                        ),
                        _react2.default.createElement('textarea', { value: this.state.text, onChange: _GrumbleFormActions2.default.updateText,
                            className: 'input-grumble-text', rows: '4', required: true }),
                        _react2.default.createElement(
                            'label',
                            { className: 'input-label' },
                            'Annoyance Level'
                        ),
                        _react2.default.createElement(
                            'select',
                            { value: this.state.annoyanceLevel, onChange: _GrumbleFormActions2.default.updateAnnoyanceLevel, className: 'grumble-input' },
                            _react2.default.createElement(
                                'option',
                                { value: '0' },
                                'Neutral'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '1' },
                                'Mildly Annoyed'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '2' },
                                'Infuriated'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '3' },
                                'Extremely Angry'
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'pure-button pure-button-primary input-button' },
                            'Submit'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'help-block' },
                        this.state.helpBlock
                    )
                )
            );
        }
    }]);

    return GrumbleForm;
}(_react2.default.Component);

exports.default = GrumbleForm;

},{"../actions/GrumbleFormActions":2,"../stores/GrumbleFormStore":21,"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GrumbleStreamStore = require('../stores/GrumbleStreamStore');

var _GrumbleStreamStore2 = _interopRequireDefault(_GrumbleStreamStore);

var _GrumbleStreamActions = require('../actions/GrumbleStreamActions');

var _GrumbleStreamActions2 = _interopRequireDefault(_GrumbleStreamActions);

var _CommentForm = require('./CommentForm');

var _CommentForm2 = _interopRequireDefault(_CommentForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GrumbleStream = function (_React$Component) {
    _inherits(GrumbleStream, _React$Component);

    function GrumbleStream(props) {
        _classCallCheck(this, GrumbleStream);

        var _this = _possibleConstructorReturn(this, (GrumbleStream.__proto__ || Object.getPrototypeOf(GrumbleStream)).call(this, props));

        _this.state = _GrumbleStreamStore2.default.getState();
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(GrumbleStream, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _GrumbleStreamStore2.default.listen(this.onChange);
            _GrumbleStreamActions2.default.getGrumbles();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _GrumbleStreamStore2.default.unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleCommentFormUsernameChange',
        value: function handleCommentFormUsernameChange(index, event) {
            var data = {
                index: index,
                event: event
            };

            _GrumbleStreamActions2.default.updateCommentFormUsername(data);
        }
    }, {
        key: 'handleCommentFormTextChange',
        value: function handleCommentFormTextChange(index, event) {
            var data = {
                index: index,
                event: event
            };

            _GrumbleStreamActions2.default.updateCommentFormText(data);
        }
    }, {
        key: 'handleCommentFormSubmit',
        value: function handleCommentFormSubmit(event, index, grumbleId) {
            event.preventDefault();

            var username = this.state.commentForms[index].username.trim();
            var text = this.state.commentForms[index].text.trim();

            if (username && text) {
                _GrumbleStreamActions2.default.addComment(grumbleId, username, text);
            }
        }
    }, {
        key: 'handleHideCommentsClick',
        value: function handleHideCommentsClick(event, index) {
            event.preventDefault();
            _GrumbleStreamActions2.default.hideComments(index);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var grumbles = this.state.grumbles.map(function (grumble, index) {

                var comments = grumble.comments.map(function (comment, index) {
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'comment-container' },
                        _react2.default.createElement('div', { className: 'space' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'comment' },
                            _react2.default.createElement(
                                'div',
                                { className: 'comment-user' },
                                _react2.default.createElement('img', { className: 'user-icon', src: '/img/user-icon.png' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'user-name' },
                                    ' ',
                                    comment.username,
                                    ' '
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'guest-text' },
                                    'Guest User'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'comment-content' },
                                comment.text
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'comment-footer' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'comment-datetime', title: comment.date.num },
                                    comment.date.relative
                                )
                            )
                        )
                    );
                });

                return _react2.default.createElement(
                    'div',
                    { key: grumble._id, className: 'grumble' },
                    _react2.default.createElement(
                        'div',
                        { className: 'grumble-user' },
                        _react2.default.createElement('img', { className: 'user-icon', src: '/img/user-icon.png' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'user-name' },
                            ' ',
                            grumble.username,
                            ' '
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'guest-text' },
                            'Guest User'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grumble-content' },
                        grumble.text
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grumble-footer' },
                        _react2.default.createElement(
                            'div',
                            { className: "grumble-level grumble-level-" + grumble.annoyanceLevel.num },
                            grumble.annoyanceLevel.text
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'grumble-datetime', title: grumble.date.text },
                            grumble.date.relative
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grumble-actions' },
                        _react2.default.createElement('div', { className: 'space' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'action-buttons' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'empathize-btn' },
                                ' Empathize '
                            ),
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'toggle-comments-btn', onClick: function onClick(event) {
                                        return _this2.handleHideCommentsClick(event, index);
                                    } },
                                ' ',
                                _this2.state.hideComments[index] ? 'Show ' : 'Hide',
                                ' comments'
                            )
                        )
                    ),
                    !_this2.state.hideComments[index] && _react2.default.createElement(
                        'div',
                        { className: 'comments-panel' },
                        comments,
                        _react2.default.createElement(
                            'div',
                            { className: 'new-comment' },
                            _react2.default.createElement('div', { className: 'space' }),
                            _react2.default.createElement(_CommentForm2.default, {
                                values: _this2.state.commentForms[index],
                                onChangeUsername: function onChangeUsername(event) {
                                    return _this2.handleCommentFormUsernameChange(index, event);
                                },
                                onChangeText: function onChangeText(event) {
                                    return _this2.handleCommentFormTextChange(index, event);
                                },
                                handleSubmit: function handleSubmit(event) {
                                    return _this2.handleCommentFormSubmit(event, index, grumble._id);
                                }
                            })
                        )
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'grumble-stream' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-title' },
                    'Grumble Stream'
                ),
                this.props.newGrumbleCount > 0 && _react2.default.createElement(
                    'div',
                    { id: 'update-stream' },
                    _react2.default.createElement(
                        'a',
                        { href: '#', onClick: function onClick() {
                                _this2.props.handleNewGrumbleClick();_GrumbleStreamActions2.default.getGrumbles();
                            } },
                        this.props.newGrumbleCount,
                        ' New Grumbles. Click to Show.'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'grumble-panel' },
                    grumbles,
                    _react2.default.createElement(
                        'div',
                        { id: 'load-more-grumbles' },
                        _react2.default.createElement(
                            'a',
                            { href: '#', onClick: function onClick() {
                                    return _GrumbleStreamActions2.default.updateGrumbles(_this2.state.grumbles.length + 10);
                                } },
                            'Load more Grumbles'
                        )
                    )
                )
            );
        }
    }]);

    return GrumbleStream;
}(_react2.default.Component);

exports.default = GrumbleStream;

},{"../actions/GrumbleStreamActions":3,"../stores/GrumbleStreamStore":22,"./CommentForm":10,"react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _HomeStore = require('../stores/HomeStore');

var _HomeStore2 = _interopRequireDefault(_HomeStore);

var _HomeActions = require('../actions/HomeActions');

var _HomeActions2 = _interopRequireDefault(_HomeActions);

var _GrumbleForm = require('./GrumbleForm');

var _GrumbleForm2 = _interopRequireDefault(_GrumbleForm);

var _GrumbleStream = require('./GrumbleStream');

var _GrumbleStream2 = _interopRequireDefault(_GrumbleStream);

var _ChatPanel = require('./ChatPanel');

var _ChatPanel2 = _interopRequireDefault(_ChatPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = _HomeStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _HomeStore2.default.listen(this.onChange);

      var socket = io();
      socket.on('newGrumble', function (username) {
        if (username !== _this2.state.username) {
          _HomeActions2.default.updateNewGrumbleCount(++_this2.state.newGrumbleCount);
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _HomeStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleChangeUsername',
    value: function handleChangeUsername(event) {
      _HomeActions2.default.updateUsername(event.target.value);
    }
  }, {
    key: 'handleNewGrumbleClick',
    value: function handleNewGrumbleClick() {
      _HomeActions2.default.updateNewGrumbleCount(0);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'main-content' },
        _react2.default.createElement(_GrumbleForm2.default, {
          username: this.state.username,
          handleUsernameChange: this.handleChangeUsername }),
        _react2.default.createElement(_GrumbleStream2.default, {
          username: this.state.username,
          newGrumbleCount: this.state.newGrumbleCount,
          handleNewGrumbleClick: this.handleNewGrumbleClick }),
        _react2.default.createElement(_ChatPanel2.default, null)
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

},{"../actions/HomeActions":4,"../stores/HomeStore":23,"./ChatPanel":9,"./GrumbleForm":12,"./GrumbleStream":13,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _LoginActions = require('../actions/LoginActions');

var _LoginActions2 = _interopRequireDefault(_LoginActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = _LoginStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _LoginStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _LoginStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'error-message' },
          this.state.message
        ),
        _react2.default.createElement(
          'div',
          { className: 'center-content' },
          _react2.default.createElement(
            'div',
            { className: 'login-panel' },
            _react2.default.createElement(
              'form',
              { className: 'pure-form pure-form-aligned', method: 'POST' },
              _react2.default.createElement(
                'fieldset',
                null,
                _react2.default.createElement(
                  'legend',
                  null,
                  ' Login Form'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'pure-control-group' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Username'
                  ),
                  _react2.default.createElement('input', { name: 'username', type: 'text', placeholder: 'Username',
                    value: this.state.username, onChange: _LoginActions2.default.updateUsername })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'pure-control-group' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Password'
                  ),
                  _react2.default.createElement('input', { name: 'password', type: 'password', placeholder: 'Password',
                    value: this.state.password, onChange: _LoginActions2.default.updatePassword })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'pure-controls' },
                  _react2.default.createElement(
                    'button',
                    { type: 'submit', className: 'pure-button pure-button-primary' },
                    'Login'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '/signup' },
                    ' Sign Up '
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = Login;

},{"../actions/LoginActions":5,"../stores/LoginStore":24,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          'a',
          { className: 'index-link', href: '/' },
          ' Grumbler '
        ),
        _react2.default.createElement(
          'a',
          { className: 'login-link', href: '/login' },
          ' Login '
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;

},{"react":"react","react-router":"react-router"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SignupStore = require('../stores/SignupStore');

var _SignupStore2 = _interopRequireDefault(_SignupStore);

var _SignupActions = require('../actions/SignupActions');

var _SignupActions2 = _interopRequireDefault(_SignupActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = _SignupStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _SignupStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _SignupStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'error-message' },
          this.state.message
        ),
        _react2.default.createElement(
          'div',
          { className: 'center-content' },
          _react2.default.createElement(
            'div',
            { className: 'login-panel' },
            _react2.default.createElement(
              'form',
              { className: 'pure-form pure-form-aligned', method: 'POST' },
              _react2.default.createElement(
                'fieldset',
                null,
                _react2.default.createElement(
                  'legend',
                  null,
                  ' Sign Up Form'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'pure-control-group' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Username'
                  ),
                  _react2.default.createElement('input', { name: 'username', type: 'text', placeholder: 'Username',
                    value: this.state.username, onChange: _SignupActions2.default.updateUsername })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'pure-control-group' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Password'
                  ),
                  _react2.default.createElement('input', { name: 'password', type: 'password', placeholder: 'Password',
                    value: this.state.password, onChange: _SignupActions2.default.updatePassword })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'pure-controls' },
                  _react2.default.createElement(
                    'button',
                    { type: 'submit', className: 'pure-button pure-button-primary' },
                    'Sign up'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '/login' },
                    ' Login '
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = Login;

},{"../actions/SignupActions":6,"../stores/SignupStore":25,"react":"react","react-router":"react-router"}],18:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
	_reactRouter2.default,
	{ history: history },
	_routes2.default
), document.getElementById('app'));

},{"./routes":19,"history/lib/createBrowserHistory":34,"react":"react","react-dom":"react-dom","react-router":"react-router"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Login = require('./components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require('./components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _Signup2.default })
);

},{"./components/App":8,"./components/Home":14,"./components/Login":15,"./components/Signup":17,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ChatPanelActions = require('../actions/ChatPanelActions');

var _ChatPanelActions2 = _interopRequireDefault(_ChatPanelActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatPanelStore = function () {
  function ChatPanelStore() {
    _classCallCheck(this, ChatPanelStore);

    this.bindActions(_ChatPanelActions2.default);
    this.username = '';
    this.text = '';
    this.onlineUsers = 0;
    this.messages = [];
  }

  _createClass(ChatPanelStore, [{
    key: 'onUpdateUsername',
    value: function onUpdateUsername(event) {
      this.username = event.target.value.trim();
    }
  }, {
    key: 'onUpdateText',
    value: function onUpdateText(event) {
      this.text = event.target.value;
    }
  }, {
    key: 'onUpdateOnlineUsers',
    value: function onUpdateOnlineUsers(data) {
      this.onlineUsers = data.onlineUsers;
    }
  }, {
    key: 'onUpdateMessages',
    value: function onUpdateMessages(messages) {
      this.messages = messages;
    }
  }, {
    key: 'onAddMessage',
    value: function onAddMessage(message) {
      this.messages.push(message);
    }
  }, {
    key: 'onClearText',
    value: function onClearText() {
      this.text = '';
    }
  }]);

  return ChatPanelStore;
}();

exports.default = _alt2.default.createStore(ChatPanelStore);

},{"../actions/ChatPanelActions":1,"../alt":7}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _GrumbleFormActions = require('../actions/GrumbleFormActions');

var _GrumbleFormActions2 = _interopRequireDefault(_GrumbleFormActions);

var _GrumbleStreamActions = require('../actions/GrumbleStreamActions');

var _GrumbleStreamActions2 = _interopRequireDefault(_GrumbleStreamActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GrumbleFormStore = function () {
  function GrumbleFormStore() {
    _classCallCheck(this, GrumbleFormStore);

    this.bindActions(_GrumbleFormActions2.default);
    this.text = '';
    this.annoyanceLevel = 0;
    this.helpBlock = '';
  }

  _createClass(GrumbleFormStore, [{
    key: 'onUpdateText',
    value: function onUpdateText(event) {
      this.text = event.target.value;
    }
  }, {
    key: 'onUpdateAnnoyanceLevel',
    value: function onUpdateAnnoyanceLevel(event) {
      this.annoyanceLevel = event.target.value;
    }
  }, {
    key: 'onAddGrumbleSuccess',
    value: function onAddGrumbleSuccess(successMessage) {
      this.username = '';
      this.text = '';
      this.annoyanceLevel = 0;

      _GrumbleStreamActions2.default.getGrumbles(10);
    }
  }, {
    key: 'onAddGrumbleFail',
    value: function onAddGrumbleFail(errorMessage) {
      this.helpBlock = errorMessage;
    }
  }]);

  return GrumbleFormStore;
}();

exports.default = _alt2.default.createStore(GrumbleFormStore);

},{"../actions/GrumbleFormActions":2,"../actions/GrumbleStreamActions":3,"../alt":7}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _GrumbleStreamActions = require('../actions/GrumbleStreamActions');

var _GrumbleStreamActions2 = _interopRequireDefault(_GrumbleStreamActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GrumbleStreamStore = function () {
  function GrumbleStreamStore() {
    _classCallCheck(this, GrumbleStreamStore);

    this.bindActions(_GrumbleStreamActions2.default);
    this.grumbles = [];
    this.commentForms = [];
    this.hideComments = [];
  }

  _createClass(GrumbleStreamStore, [{
    key: 'onGetGrumblesSuccess',
    value: function onGetGrumblesSuccess(grumbles) {
      this.commentForms = [];
      this.grumbles = grumbles;

      for (var i = 0; i < grumbles.length; i++) {
        this.commentForms.push({
          username: '',
          text: ''
        });
        this.hideComments.push(false);
      }
    }
  }, {
    key: 'onGetGrumblesFail',
    value: function onGetGrumblesFail(grumbles) {
      this.grumbles = grumbles;
    }
  }, {
    key: 'onUpdateCommentFormUsername',
    value: function onUpdateCommentFormUsername(data) {
      this.commentForms[data.index].username = data.event.target.value.trim();
    }
  }, {
    key: 'onUpdateCommentFormText',
    value: function onUpdateCommentFormText(data) {
      this.commentForms[data.index].text = data.event.target.value;
    }
  }, {
    key: 'onHideComments',
    value: function onHideComments(index) {
      this.hideComments[index] = !this.hideComments[index];
    }
  }]);

  return GrumbleStreamStore;
}();

exports.default = _alt2.default.createStore(GrumbleStreamStore);

},{"../actions/GrumbleStreamActions":3,"../alt":7}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _HomeActions = require('../actions/HomeActions');

var _HomeActions2 = _interopRequireDefault(_HomeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeStore = function () {
  function HomeStore() {
    _classCallCheck(this, HomeStore);

    this.bindActions(_HomeActions2.default);
    this.username = '';
    this.newGrumbleCount = 0;
  }

  _createClass(HomeStore, [{
    key: 'onUpdateUsername',
    value: function onUpdateUsername(username) {
      this.username = username.trim();
    }
  }, {
    key: 'onUpdateNewGrumbleCount',
    value: function onUpdateNewGrumbleCount(count) {
      this.newGrumbleCount = count;
    }
  }]);

  return HomeStore;
}();

exports.default = _alt2.default.createStore(HomeStore);

},{"../actions/HomeActions":4,"../alt":7}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _LoginActions = require('../actions/LoginActions');

var _LoginActions2 = _interopRequireDefault(_LoginActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginStore = function () {
  function LoginStore() {
    _classCallCheck(this, LoginStore);

    this.bindActions(_LoginActions2.default);
    this.username = '';
    this.password = '';
    this.message = '';
  }

  _createClass(LoginStore, [{
    key: 'onUpdateUsername',
    value: function onUpdateUsername(event) {
      this.username = event.target.value;
    }
  }, {
    key: 'onUpdatePassword',
    value: function onUpdatePassword(event) {
      this.password = event.target.value;
    }
  }]);

  return LoginStore;
}();

exports.default = _alt2.default.createStore(LoginStore);

},{"../actions/LoginActions":5,"../alt":7}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _SignupActions = require('../actions/SignupActions');

var _SignupActions2 = _interopRequireDefault(_SignupActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupStore = function () {
  function SignupStore() {
    _classCallCheck(this, SignupStore);

    this.bindActions(_SignupActions2.default);
    this.username = '';
    this.password = '';
    this.message = '';
  }

  _createClass(SignupStore, [{
    key: 'onUpdateUsername',
    value: function onUpdateUsername(event) {
      this.username = event.target.value;
    }
  }, {
    key: 'onUpdatePassword',
    value: function onUpdatePassword(event) {
      this.password = event.target.value;
    }
  }]);

  return SignupStore;
}();

exports.default = _alt2.default.createStore(SignupStore);

},{"../actions/SignupActions":6,"../alt":7}],26:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":27,"./lib/keys.js":28}],27:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],28:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],29:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],30:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],31:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))

},{"_process":43,"warning":44}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],34:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Actions":29,"./DOMStateStorage":31,"./DOMUtils":32,"./ExecutionEnvironment":33,"./createDOMHistory":35,"./parsePath":40,"_process":43,"invariant":42}],35:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./DOMUtils":32,"./ExecutionEnvironment":33,"./createHistory":36,"_process":43,"invariant":42}],36:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":29,"./AsyncUtils":30,"./createLocation":37,"./deprecate":38,"./parsePath":40,"./runTransitionHook":41,"deep-equal":26}],37:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":29,"./parsePath":40}],38:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],39:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],40:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./extractPath":39,"_process":43,"warning":44}],41:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"_process":43,"warning":44}],42:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":43}],43:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],44:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"_process":43}]},{},[18])

//# sourceMappingURL=bundle.js.map
