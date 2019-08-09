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

var AddAddress =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddAddress, _React$Component);

  function AddAddress() {
    var _this;

    _classCallCheck(this, AddAddress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddAddress).call(this));
    _this.index = _this.index.bind(_assertThisInitialized(_this));
    _this.saved = _this.saved.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.state = {
      address: {
        "key": -1,
        "Line1": "",
        "Line2": "",
        "Country": "",
        "PostCode": ""
      }
    };
    _this.showError = _this.showError.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddAddress, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this2 = this;

      if (!isNaN(this.props.data)) {
        fetch('/api/address/' + this.props.data).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this2.setState({
            address: data.address
          });
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var a = this.state.address;
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
        name: "address",
        onSubmit: this.handleSubmit
      }, React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "Line1: "), React.createElement("input", {
        type: "text",
        name: "l1",
        defaultValue: a.Line1,
        onBlur: this.handleChange
      })), React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "Line2: "), React.createElement("input", {
        type: "text",
        name: "l2",
        defaultValue: a.Line2,
        onBlur: this.handleChange
      })), React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "Country: "), React.createElement("select", {
        type: "date",
        name: "co",
        defaultValue: a.Country,
        selected: a.Country,
        onBlur: this.handleChange
      }, React.createElement("option", {
        value: "Albania"
      }, "Albania"), React.createElement("option", {
        value: "Andorra"
      }, "Andorra"), React.createElement("option", {
        value: "Austria"
      }, "Austria"), React.createElement("option", {
        value: "Belarus"
      }, "Belarus"), React.createElement("option", {
        value: "Belgium"
      }, "Belgium"), React.createElement("option", {
        value: "Bosnia and Herzegovina"
      }, "Bosnia and Herzegovina"), React.createElement("option", {
        value: "Bulgaria"
      }, "Bulgaria"), React.createElement("option", {
        value: "Croatia"
      }, "Croatia"), React.createElement("option", {
        value: "Cyprus"
      }, "Cyprus"), React.createElement("option", {
        value: "Czech Republic"
      }, "Czech Republic"), React.createElement("option", {
        value: "Denmark"
      }, "Denmark"), React.createElement("option", {
        value: "East Germany"
      }, "East Germany"), React.createElement("option", {
        value: "Estonia"
      }, "Estonia"), React.createElement("option", {
        value: "Faroe Islands"
      }, "Faroe Islands"), React.createElement("option", {
        value: "Finland"
      }, "Finland"), React.createElement("option", {
        value: "France"
      }, "France"), React.createElement("option", {
        value: "Germany"
      }, "Germany"), React.createElement("option", {
        value: "Gibraltar"
      }, "Gibraltar"), React.createElement("option", {
        value: "Greece"
      }, "Greece"), React.createElement("option", {
        value: "Guernsey"
      }, "Guernsey"), React.createElement("option", {
        value: "Hungary"
      }, "Hungary"), React.createElement("option", {
        value: "Iceland"
      }, "Iceland"), React.createElement("option", {
        value: "Ireland"
      }, "Ireland"), React.createElement("option", {
        value: "Isle of Man"
      }, "Isle of Man"), React.createElement("option", {
        value: "Italy"
      }, "Italy"), React.createElement("option", {
        value: "Jersey"
      }, "Jersey"), React.createElement("option", {
        value: "Latvia"
      }, "Latvia"), React.createElement("option", {
        value: "Liechtenstein"
      }, "Liechtenstein"), React.createElement("option", {
        value: "Lithuania"
      }, "Lithuania"), React.createElement("option", {
        value: "Luxembourg"
      }, "Luxembourg"), React.createElement("option", {
        value: "Macedonia"
      }, "Macedonia"), React.createElement("option", {
        value: "Malta"
      }, "Malta"), React.createElement("option", {
        value: "Metropolitan France"
      }, "Metropolitan France"), React.createElement("option", {
        value: "Moldova"
      }, "Moldova"), React.createElement("option", {
        value: "Monaco"
      }, "Monaco"), React.createElement("option", {
        value: "Montenegro"
      }, "Montenegro"), React.createElement("option", {
        value: "Netherlands"
      }, "Netherlands"), React.createElement("option", {
        value: "Norway"
      }, "Norway"), React.createElement("option", {
        value: "Poland"
      }, "Poland"), React.createElement("option", {
        value: "Portugal"
      }, "Portugal"), React.createElement("option", {
        value: "Romania"
      }, "Romania"), React.createElement("option", {
        value: "Russia"
      }, "Russia"), React.createElement("option", {
        value: "San Marino"
      }, "San Marino"), React.createElement("option", {
        value: "Serbia"
      }, "Serbia"), React.createElement("option", {
        value: "Serbia and Montenegro"
      }, "Serbia and Montenegro"), React.createElement("option", {
        value: "Slovakia"
      }, "Slovakia"), React.createElement("option", {
        value: "Slovenia"
      }, "Slovenia"), React.createElement("option", {
        value: "Spain"
      }, "Spain"), React.createElement("option", {
        value: "Svalbard and Jan Mayen"
      }, "Svalbard and Jan Mayen"), React.createElement("option", {
        value: "Sweden"
      }, "Sweden"), React.createElement("option", {
        value: "Switzerland"
      }, "Switzerland"), React.createElement("option", {
        value: "Ukraine"
      }, "Ukraine"), React.createElement("option", {
        value: "Union of Soviet Socialist Republics"
      }, "Union of Soviet Socialist Republics"), React.createElement("option", {
        value: "United Kingdom"
      }, "United Kingdom"), React.createElement("option", {
        value: "Vatican City"
      }, "Vatican City"), React.createElement("option", {
        value: "\xC5land Islands"
      }, "\xC5land Islands"))), React.createElement("div", null, React.createElement("label", {
        className: "lform"
      }, "PostCode: "), React.createElement("input", {
        type: "text",
        name: "po",
        defaultValue: a.PostCode,
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
      var form = document.forms.address;

      if (this.state.address.key > 0) {
        fetch('/api/address/' + this.state.address.key, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "Line1": form.l1.value || "",
            "Line2": form.l2.value || "",
            "Country": form.co.value || "",
            "PostCode": form.po.value || ""
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
      } else {
        fetch('/api/address', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "personId": this.props.personId,
            "address": {
              "Line1": form.l1.value || "",
              "Line2": form.l2.value || "",
              "Country": form.co.value || "",
              "PostCode": form.po.value || ""
            }
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
        case "l1":
          if (!o.target.value || o.target.value.length > 20) {
            o.target.style.borderColor = "red";
          } else {
            o.target.style.borderColor = "green";
          }

          break;

        case "l2":
          if (o.target.value && new RegExp(/[^a-zA-Z ]/).test(o.target.value) || o.target.value.length > 20) {
            o.target.style.borderColor = "red";
          } else {
            o.target.style.borderColor = "green";
          }

          break;

        case "po":
          if (o.target.value && new RegExp(/[^a-zA-Z0-9]/).test(o.target.value) || !o.target.value || o.target.value.length > 10) {
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

  return AddAddress;
}(React.Component);