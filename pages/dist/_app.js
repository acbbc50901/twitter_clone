"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Layout_1 = require("@/components/Layout");
var LoginModal_1 = require("@/components/modals/LoginModal");
var EditModal_1 = require("@/components/modals/EditModal");
var RegisterModal_1 = require("@/components/modals/RegisterModal");
var react_hot_toast_1 = require("react-hot-toast");
var react_1 = require("next-auth/react");
require("@/styles/globals.css");
function App(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (React.createElement(react_1.SessionProvider, { session: pageProps.session },
        React.createElement(react_hot_toast_1.Toaster, null),
        React.createElement(EditModal_1["default"], null),
        React.createElement(LoginModal_1["default"], null),
        React.createElement(RegisterModal_1["default"], null),
        React.createElement(Layout_1["default"], null,
            React.createElement(Component, __assign({}, pageProps)))));
}
exports["default"] = App;
