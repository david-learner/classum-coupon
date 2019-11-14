import $ from 'jquery';
import moment from 'moment-timezone';

$('#createCoupon').on("click", function () {
    let emailElement:HTMLInputElement = document.querySelector("[name=email]") as HTMLInputElement;
    let email = {
        email : emailElement.value
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(email),
        contentType: 'application/json',
        url: '/api/coupons'
    }).done(function (data) {
        console.log('coupon create success');

        let outputElement = document.querySelector("#output");
        let expiredDateWithTimezone = moment(data['_expiredDate']).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
        if (outputElement != null) {
            outputElement.innerHTML = 
                "발급된 쿠폰 번호는 [" + data['_number'] + "]이며 <br/>"
                + "만료기간은 지금으로부터 3일 뒤인 [ "+ expiredDateWithTimezone +" ]까지 입니다";
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        let error = JSON.parse(jqXHR.responseText);
        alert(error['message']);
    });
});

$('#readCoupon').on("click", function () {
    let emailElement:HTMLInputElement = document.querySelector("[name=email]") as HTMLInputElement; 

    $.ajax({
        type: 'GET',
        data: {email: emailElement.value},
        contentType: "application/json",
        url: '/api/coupons'
    }).done(function (data) {
        console.log('coupon read success');

        let outputElement = document.querySelector("#output");
        let expiredDateWithTimezone = moment(data['_expiredDate']).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
        if (outputElement != null) {
            outputElement.innerHTML = 
                "발급된 쿠폰 번호는 [" + data['_number'] + "]이며 <br/>"
                + "만료기간은 [ "+ expiredDateWithTimezone +" ]까지 입니다";
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        let error = JSON.parse(jqXHR.responseText);
        alert(error['message']);
    });
});

$('#useCoupon').on("click", function () {
    let couponNumberElement:HTMLInputElement = document.querySelector("[name=couponNumber]") as HTMLInputElement; 
    let couponNumber = {
        couponNumber : couponNumberElement.value
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(couponNumber),
        contentType: 'application/json',
        url: '/api/coupons/use'
    }).done(function (data) {
        console.log('coupon use success');

        let outputElement = document.querySelector("#output");
        if (outputElement != null) {
            outputElement.innerHTML = 
                "쿠폰이 정상적으로 사용되었습니다";
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        let error = JSON.parse(jqXHR.responseText);
        alert(error['message']);
    });
});