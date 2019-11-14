import $ from 'jquery';
import moment from 'moment-timezone';

$('#createCoupon').on("click", function () {
    let emailElement: HTMLInputElement = document.querySelector("[name=email]") as HTMLInputElement;
    let email = {
        email: emailElement.value
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(email),
        contentType: 'application/json',
        url: '/api/coupons'
    }).done(function (data) {
        console.log('coupon create success');

        let outputElement: HTMLElement = document.querySelector("#output") as HTMLElement;
        let expiredDateWithTimezone = moment(data['_expiredDate']).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
        outputElement.innerHTML =
            "발급된 쿠폰 번호 : " + data['_number'] + "<br/>"
            + "만료기간 : " + expiredDateWithTimezone;

        let outputJsonElement: HTMLElement = document.querySelector("#output-json") as HTMLElement;
        outputJsonElement.innerHTML = JSON.stringify(data);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        let error = JSON.parse(jqXHR.responseText);
        alert(error['message']);
    });
});

$('#readCoupon').on("click", function () {
    let emailElement: HTMLInputElement = document.querySelector("[name=email]") as HTMLInputElement;
    let data = { email: emailElement.value };
    readCoupon(data, '/api/coupons');
});

$('#readCouponFromNumber').on("click", function () {
    let couponNumberElement: HTMLInputElement = document.querySelector("[name=couponNumber]") as HTMLInputElement;
    let data = { couponNumber: couponNumberElement.value };
    readCoupon(data, '/api/coupons');
});

function readCoupon(data: object, url: string) {
    $.ajax({
        type: 'GET',
        data: data,
        contentType: "application/json",
        url: url
    }).done(function (data) {
        console.log('coupon read success');

        let outputElement: HTMLElement = document.querySelector("#output") as HTMLElement;
        let expiredDate = moment(data['_expiredDate']).tz('Asia/Seoul');
        let now = moment();
        outputElement.innerHTML =
            "발급된 쿠폰 번호 : " + data['_number'] + "<br/>"
            + "만료기간 : " + expiredDate.format('YYYY-MM-DD HH:mm') + "<br/>";
        if (expiredDate < now) {
            outputElement.innerHTML += "** 사용기한이 만료된 쿠폰입니다 **"
        }

        let outputJsonElement: HTMLElement = document.querySelector("#output-json") as HTMLElement;
        outputJsonElement.innerHTML = JSON.stringify(data);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        let error = JSON.parse(jqXHR.responseText);
        alert(error['message']);
    });
}

$('#useCoupon').on("click", function () {
    let couponNumberElement: HTMLInputElement = document.querySelector("[name=couponNumber]") as HTMLInputElement;
    let couponNumber = {
        couponNumber: couponNumberElement.value
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(couponNumber),
        contentType: 'application/json',
        url: '/api/coupons/use'
    }).done(function (data) {
        console.log('coupon use success');

        let outputElement: HTMLElement = document.querySelector("#output") as HTMLElement;
        outputElement.innerHTML = "쿠폰이 정상적으로 사용되었습니다";
        let outputJsonElement:HTMLElement = document.querySelector("#output-json") as HTMLElement;
        outputJsonElement.innerHTML = "";

    }).fail(function (jqXHR, textStatus, errorThrown) {
        let error = JSON.parse(jqXHR.responseText);
        alert(error['message']);
    });
});