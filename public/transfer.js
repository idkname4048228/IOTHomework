function generateQRCode(url) {
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = ''; // 清空先前的 QR code
    // 使用 QRCode.js 生成 QR code
    new QRCode(qrcodeDiv, {
        text: url,
        width: 300,
        height: 300
    });
}

var account = "Alice";
var amountInput = document.getElementById('amount');
amountInput.addEventListener('input', () => {
    var value = amountInput.value;
    url = `http://localhost:3000/${account}/${value}`
    generateQRCode(url);
});