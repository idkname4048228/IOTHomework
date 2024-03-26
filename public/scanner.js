// 從後端獲取當前使用者
fetch('currentuser')
    .then(response => response.json())
    .then(data => {
        if (data.username !== undefined) {
            document.getElementById('currentUser').textContent = `當前使用者: ${data.username}`;
        } else {
            window.location.href = '/login.html';
            // document.getElementById('currentUser').textContent = '當前使用者: Unauthenticated';
        }
    })
    .catch(error => {
        console.error('Error fetching current user:', error);
        document.getElementById('currentUser').textContent = '當前使用者: 資料取得失敗';
    });

// 從後端獲取當前金額
fetch('balance')
    .then(response => response.json())
    .then(data => {
        if (data.balance !== undefined) {
            document.getElementById('currentBalance').textContent = `當前金額: ${data.balance} 元`;
        }
    })
    .catch(error => {
        console.error('Error fetching balance:', error);
        document.getElementById('currentBalance').textContent = '當前金額: 資料取得失敗';
    });

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
