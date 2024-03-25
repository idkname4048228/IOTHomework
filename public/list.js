fetch('users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');

        data.forEach(user => {
            const row = `
                <tr>
                    <td>${user.user}</td>   
                    <td>${user.balance} 元</td>
                </tr>
            `;
            userList.innerHTML += row;
        });
    })
    .catch(error => {
        console.error('Error fetching user list:', error);
        alert('資料取得失敗');
    });
