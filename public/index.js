"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Person =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Person, _React$Component);

  function Person() {
    var _this;

    _classCallCheck(this, Person);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Person).call(this));
    _this.edit = _this.edit.bind(_assertThisInitialized(_this));
    _this.delete = _this.delete.bind(_assertThisInitialized(_this));
    _this.saved = _this.saved.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Person, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      return React.createElement("div", {
        key: data.key
      }, React.createElement("div", {
        className: "tile-button-container"
      }, React.createElement("div", null, React.createElement("a", {
        href: "#",
        className: "edit-button",
        onClick: this.edit
      }, React.createElement("i", {
        className: "fa fa-lg fa-pencil-square-o"
      }))), React.createElement("div", null, React.createElement("a", {
        href: "#",
        className: "delete-button",
        onClick: this.delete
      }, React.createElement("i", {
        className: "fa fa-lg fa-times"
      })))), React.createElement("div", null, React.createElement("label", null, "Name: "), React.createElement("div", null, data.FirstName, " ", data.LastName)), React.createElement("div", null, React.createElement("label", null, "Nickname: "), React.createElement("div", null, data.NickName)), React.createElement("div", null, React.createElement("label", null, "Date of Birth: "), React.createElement("div", null, data.DOB)));
    }
  }, {
    key: "edit",
    value: function edit() {
      var data = this.props.data;
      ReactDOM.render(React.createElement(AddPerson, {
        data: data.key
      }), document.getElementById("app"));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this2 = this;

      if (confirm("Are you sure you want to delete this person?")) {
        fetch('/api/person/' + this.props.data.key, {
          method: 'delete'
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this2.saved();
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }, {
    key: "saved",
    value: function saved() {
      var elem = document.getElementById("app");
      ReactDOM.unmountComponentAtNode(elem);
      ReactDOM.render(React.createElement(App, {
        saved: "true"
      }), elem);
    }
  }]);

  return Person;
}(React.Component);

var Address =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Address, _React$Component2);

  function Address() {
    var _this3;

    _classCallCheck(this, Address);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Address).call(this));
    _this3.edit = _this3.edit.bind(_assertThisInitialized(_this3));
    _this3.delete = _this3.delete.bind(_assertThisInitialized(_this3));
    _this3.saved = _this3.saved.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(Address, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      return React.createElement("div", {
        key: data.key
      }, React.createElement("div", {
        className: "tile-button-container"
      }, React.createElement("div", null, React.createElement("a", {
        href: "#",
        className: "edit-button",
        onClick: this.edit
      }, React.createElement("i", {
        className: "fa fa-lg fa-pencil-square-o"
      }))), React.createElement("div", null, React.createElement("a", {
        href: "#",
        className: "delete-button",
        onClick: this.delete
      }, React.createElement("i", {
        className: "fa fa-lg fa-times"
      })))), React.createElement("div", null, data.Line1, React.createElement("br", null), data.Line2, React.createElement("br", null), data.Country, React.createElement("br", null), data.PostCode), React.createElement("hr", null));
    }
  }, {
    key: "edit",
    value: function edit() {
      var data = this.props.data;
      ReactDOM.render(React.createElement(AddAddress, {
        data: data.key
      }), document.getElementById("app"));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this4 = this;

      if (confirm("Are you sure you want to delete this address?")) {
        fetch('/api/address/' + this.props.data.key + '/' + this.props.personId, {
          method: 'delete'
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this4.saved();
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }, {
    key: "saved",
    value: function saved() {
      var elem = document.getElementById("app");
      ReactDOM.unmountComponentAtNode(elem);
      ReactDOM.render(React.createElement(App, {
        saved: "true"
      }), elem);
    }
  }]);

  return Address;
}(React.Component);

var AddressList =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(AddressList, _React$Component3);

  function AddressList() {
    var _this5;

    _classCallCheck(this, AddressList);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(AddressList).call(this));
    _this5.new = _this5.new.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(AddressList, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      var data = this.props.data;
      var addresses = data.map(function (address) {
        return React.createElement(Address, {
          data: address,
          key: address.key,
          personId: _this6.props.personId
        });
      });
      return React.createElement("div", null, React.createElement("label", null, "Addresses:"), addresses, React.createElement("a", {
        href: "#",
        onClick: this.new
      }, "New Address"));
    }
  }, {
    key: "new",
    value: function _new() {
      ReactDOM.render(React.createElement(AddAddress, {
        personId: this.props.personId
      }), document.getElementById("app"));
    }
  }]);

  return AddressList;
}(React.Component);

var IndexTile =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(IndexTile, _React$Component4);

  function IndexTile() {
    _classCallCheck(this, IndexTile);

    return _possibleConstructorReturn(this, _getPrototypeOf(IndexTile).apply(this, arguments));
  }

  _createClass(IndexTile, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      return React.createElement("div", {
        className: "grid-item"
      }, React.createElement("div", null, React.createElement(Person, {
        data: data.Person
      })), React.createElement("div", null, React.createElement(AddressList, {
        data: data.Addresses,
        personId: data.Person.key
      })));
    }
  }]);

  return IndexTile;
}(React.Component);

var IndexTiles =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(IndexTiles, _React$Component5);

  function IndexTiles() {
    var _this7;

    _classCallCheck(this, IndexTiles);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(IndexTiles).call(this));
    _this7.state = {
      people: []
    };
    return _this7;
  }

  _createClass(IndexTiles, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this8 = this;

      fetch('/api/people').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this8.setState({
          people: data.records
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var peopleList = this.state.people;
      var tiles = peopleList.map(function (person) {
        return React.createElement(IndexTile, {
          data: person,
          key: person.key
        });
      });
      return React.createElement(React.Fragment, null, tiles);
    }
  }]);

  return IndexTiles;
}(React.Component);