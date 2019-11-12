import $ from 'jquery';

$('#createCoupon').on("click", function () {
    $.ajax({
        type: 'POST',
        data: $('#couponForm').serialize(),
        contentType: 'application/x-www-form-urlencoded',
        url: '/coupons'
    }).done(function (data) {
        console.log('coupon create success');
        console.log(data);

        let outputElement = document.querySelector("#output");
        if (outputElement != null) {
            // outputElement.innerHTML = JSON.stringify(data);
            outputElement.innerHTML = 
                "발급된 쿠폰 번호는 [" + data['number'] + "]이며 <br/>"
                + "만료기간은 지금으로부터 3일 뒤인 [ "+ data['expiredDate'] +" ]까지 입니다";
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {

    });
});
