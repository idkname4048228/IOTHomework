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

// 登出功能
document.getElementById('logoutBtn').addEventListener('click', function() {
    fetch('/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console
        if (data.success) {
            alert('登出成功');
            // 重新導向到登入頁面
            window.location.href = '/login.html';
        } else {
            alert('登出失敗');
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
        alert('登出失敗');
    });
});
