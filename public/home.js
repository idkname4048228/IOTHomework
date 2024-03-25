// 從後端獲取當前使用者
fetch('/currentuser')
    .then(response => response.json())
    .then(data => {
        if (data.username !== undefined) {
            document.getElementById('currentUser').textContent = `當前使用者: ${data.username}`;
        } else {
            document.getElementById('currentUser').textContent = '當前使用者: Unauthenticated';
        }
    })
    .catch(error => {
        console.error('Error fetching current user:', error);
        document.getElementById('currentUser').textContent = '當前使用者: 資料取得失敗';
    });

// 從後端獲取當前金額
fetch('/balance')
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