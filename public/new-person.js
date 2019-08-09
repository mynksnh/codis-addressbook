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

var AddPerson =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddPerson, _React$Component);

  function AddPerson() {
    var _this;

    _classCallCheck(this, AddPerson);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddPerson).call(this));
    _this.index = _this.index.bind(_assertThisInitialized(_this));
    _this.saved = _this.saved.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.state = {
      person: {
        "key": -1,
        "FirstName": "",
        "LastName": "",
        "DOB": "",
        "NickName": ""
      }
    };
    _this.showError = _this.showError.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddPerson, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this2 = this;

      if (!isNaN(this.props.data)) {
        fetch('/api/person/' + this.props.data).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this2.setState({
            person: data.person
          });
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var p = this.state.person;
      return React.createElement("div", {
        className: "form"
      }, React.createElement("div", {
        id: "snackbar"
      }), React.createElement("div", null, React.createElement("a", {
        href: "#",
        onClick: this.index
      }, React.createElement("i", {
        className: "fa fa-lg fa-angle-double-left"
      }), " back")), React.createElement("form", {
        name: "person",
        onSubmit: this.handleSubmit
      }, React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "First Name: "), React.createElement("input", {
        type: "text",
        name: "fname",
        defaultValue: p.FirstName,
        onBlur: this.handleChange
      })), React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "Last Name: "), React.createElement("input", {
        type: "text",
        name: "lname",
        defaultValue: p.LastName,
        onBlur: this.handleChange
      })), React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "Date of Birth: "), React.createElement("input", {
        type: "date",
        name: "bday",
        defaultValue: p.DOB,
        onBlur: this.handleChange
      })), React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "Nickname: "), React.createElement("input", {
        type: "text",
        name: "nname",
        defaultValue: p.NickName,
        onBlur: this.handleChange
      })), React.createElement("div", null, React.createElement("input", {
        type: "submit",
        name: "submit",
        value: "Submit"
      }))));
    }
  }, {
    key: "index",
    value: function index() {
      ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
    }
  }, {
    key: "saved",
    value: function saved() {
      ReactDOM.render(React.createElement(App, {
        saved: "true"
      }), document.getElementById("app"));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this3 = this;

      e.preventDefault();
      var form = document.forms.person;

      if (this.state.person.key > 0) {
        fetch('/api/person/' + this.state.person.key, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "FirstName": form.fname.value || "",
            "LastName": form.lname.value || "",
            "DOB": form.bday.value || "",
            "NickName": form.nname.value || ""
          })
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.error) {
            _this3.showError(data.error);
          } else {
            _this3.saved();
          }
        }).catch(function (err) {
          _this3.showError(err);

          console.log(err);
        });
      } else {
        fetch('/api/person', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "FirstName": form.fname.value || "",
            "LastName": form.lname.value || "",
            "DOB": form.bday.value || "",
            "NickName": form.nname.value || ""
          })
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.error) {
            _this3.showError(data.error);
          } else {
            _this3.saved();
          }
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(o) {
      switch (o.target.name) {
        case "fname":
        case "lname":
          if (o.target.value && new RegExp(/[^a-zA-Z]/).test(o.target.value) || !o.target.value || o.target.value.length > 20) {
            o.target.style.borderColor = "red";
          } else {
            o.target.style.borderColor = "green";
          }

          break;

        case "bday":
          if (o.target.value && new Date(o.target.value) > new Date() || !o.target.value) {
            o.target.style.borderColor = "red";
          } else {
            o.target.style.borderColor = "green";
          }

          break;

        case "nname":
          if (o.target.value && new RegExp(/[^a-zA-Z0-9]/).test(o.target.value) || o.target.value > 20) {
            o.target.style.borderColor = "red";
          } else {
            o.target.style.borderColor = "green";
          }

          break;
      }
    }
  }, {
    key: "showError",
    value: function showError(err) {
      var x = document.getElementById("snackbar");
      x.className = "error show";
      x.innerHTML = err;

      x.onclick = function (o) {
        x.className = x.className.replace("show", "");
      };
    }
  }]);

  return AddPerson;
}(React.Component);