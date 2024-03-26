fetch('currentuser')
    .then(response => {
        if (!response.ok) {
            window.location.href = '/login.html';
        }
    })

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

var submit = document.getElementById('submit');
var amountInput = document.getElementById('amount');
submit.addEventListener('click', () => {
    fetch('currentuser')
        .then(response => response.json())
        .then(data => {
            if (data.username !== undefined) {
                var account = data.username;
                var value = amountInput.value;
                url = `http://localhost:3000/transfer/${account}/${value}`
                console.log(url);
                generateQRCode(url);
            } else {
                document.getElementById('currentUser').textContent = '當前使用者: Unauthenticated';
            }
        })
        .catch(error => {
            console.error('Error fetching current user:', error);
            document.getElementById('currentUser').textContent = '當前使用者: 資料取得失敗';
        });

});