fetch('currentuser')
    .then(response => {
        if (!response.ok) {
            window.location.href = '/login.html';
        }
    })

function deposit() {
    const amount = document.getElementById('amount').value;

    // 輸入檢查
    if (amount <= 0 || isNaN(amount)) {
        alert('請輸入有效的金額');
        return;
    }

    // 發送存款請求到後端
    fetch('/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`存款成功，當前金額: ${data.balance} 元`);
            window.location.href = '/home.html';  // 返回主選單或其他頁面
        } else {
            alert('存款失敗');
        }
    })
    .catch(error => {
        console.error('Error depositing:', error);
        alert('存款過程中發生錯誤');
    });
}

// 回到主選單函數
function goToMainMenu() {
    window.location.href = '/home.html';
}

// 監聽 Enter 鍵
document.getElementById('amount').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        deposit();
    }
});