"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
var App;
(function (App) {
    jquery_1.default('#createCoupon').on("click", function () {
        jquery_1.default.ajax({
            type: 'POST',
            data: jquery_1.default('#couponForm').serialize(),
            contentType: 'application/x-www-form-urlencoded',
            url: '/coupons'
        }).done(function (data) {
            console.log('success' + data);
            let outputElement = document.querySelector("#output");
            if (outputElement != null) {
                outputElement.innerHTML = data;
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
        });
    });
})(App || (App = {}));
