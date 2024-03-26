function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found your qr code
    function onScanSuccess(decodeText, decodeResult) {
        console.log(decodeText);
        fetch(decodeText, { method: "POST" })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('轉款成功');
                    window.location.href = '/scanner.html'; // 導向scanner.html頁面
                } else {
                    alert('轉款失敗 ' + data.error);
                }
            })
            .catch(error => {
                console.error('出事了', error);
                alert('轉款失敗');
            });
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});
