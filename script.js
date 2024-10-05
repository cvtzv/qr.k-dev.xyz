// Переключение темы
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark'); // Переключение класса dark
});

// Автоматическая установка темы в зависимости от системной
const systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (systemDarkTheme) {
    body.classList.add('dark');
}

    $('#generate-btn').click(function() {
        var text = $('#text-input').val();
        $('#qrcode').empty(); // Очищаем предыдущий QR-код
        
        if (text.trim() === "") {
            alert("Пожалуйста, введите текст или URL.");
            return;
        }
        
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: text,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        // Добавим класс для стиля QR-кода
        $('#qrcode').addClass('qr-code');

        // Показываем кнопки после генерации QR-кода
        $('#download-btn').show();
        $('#share-btn').show();
        $('#fullscreen-btn').show();
        
        // Настраиваем кнопку "Скачать"
        $('#download-btn').off('click').on('click', function() {
            var canvas = document.querySelector("#qrcode canvas");
            if (canvas) {
                var link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = canvas.toDataURL("image/png");
                link.click();
            }
        });

        // Настраиваем кнопку "Поделиться"
        $('#share-btn').off('click').on('click', function() {
            var canvas = document.querySelector("#qrcode canvas");
            if (canvas) {
                canvas.toBlob(function(blob) {
                    var item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]).then(function() {
                        alert("QR-код скопирован в буфер обмена!");
                    }, function(error) {
                        console.error("Ошибка при копировании в буфер обмена: ", error);
                    });
                });
            }
        });

        // Настраиваем кнопку "В полный экран"
        $('#fullscreen-btn').off('click').on('click', function() {
            var canvas = document.querySelector("#qrcode canvas");
            if (canvas) {
                var newWindow = window.open();
                newWindow.document.write("<title>QR-код</title><body style='margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background-color:#fff;'><img src='" + canvas.toDataURL("image/png") + "' style='max-width:100%;max-height:100%;'/></body>");
                newWindow.document.close();
            }
        });
    });
});
