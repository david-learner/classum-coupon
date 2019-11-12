import $ from 'jquery';

namespace App {
    $('#createCoupon').on("click", function() {
        $.ajax({
            type: 'POST',
            data: $('#couponForm').serialize(),
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
}