$(document).ready(function() {
    $('#generate-btn').click(function() {
        var text = $('#text-input').val();
        $('#qrcode').empty(); // Очищаем предыдущий QR-код
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: text,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    });
});
