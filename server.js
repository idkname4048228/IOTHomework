const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

const PORT = 3000;

// 解析 JSON 格式
app.use(express.json());

// 開啟資料庫連線
const db = new sqlite3.Database(':memory:'); // 在記憶體中建立 SQLite 資料庫，實際應用中應使用實體資料庫

// 建立行事曆資料表
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS calendars (id INTEGER PRIMARY KEY, year TEXT, url TEXT)");
    // 插入示範資料
    db.run("INSERT INTO calendars (year, url) VALUES ('111', 'https://oaa.ntcu.edu.tw/download.php?dir=archive&filename=b13794d5e9781a8fba9dc88f8cec28b9.pdf&title=111%E5%AD%B8%E5%B9%B4%E5%BA%A6%E8%A1%8C%E4%BA%8B%E6%9B%86')");
    db.run("INSERT INTO calendars (year, url) VALUES ('112', 'https://oaa.ntcu.edu.tw/download.php?dir=archive&filename=785e9afb33543eef724bd79be5f668b7.pdf&title=112%E5%AD%B8%E5%B9%B4%E5%BA%A6%E8%A1%8C%E4%BA%8B%E6%9B%86')");
});

// 建立銀行資料表
db.run("CREATE TABLE IF NOT EXISTS Bank (id INTEGER PRIMARY KEY, user TEXT, balance INTEGER)");

// 設置 CORS
app.use(cors());

// 取得所有行事曆 URL
app.get('/calendars', (req, res) => {
    db.all("SELECT * FROM calendars", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// 取得所有使用者資料
app.get('/users', (req, res) => {
    db.all("SELECT * FROM Bank", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});


// 新增一筆用戶資料
app.post('/insert', (req, res) => {
    try {
        const { user, balance } = req.body;
        if (!user || !balance) {
            return res.status(400).json({ error: "User and balance are required." });
        }

        db.run("INSERT INTO Bank (user, balance) VALUES (?, ?)", [user, balance], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Bank record added successfully.", id: this.lastID });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// 轉帳 user1 的錢轉給 user2
app.post('/transfer/:user1/:user2/:money', (req, res) => {
    const { user1, user2, money } = req.params;

    // 查询 user1 和 user2 的余额
    db.get("SELECT balance FROM Bank WHERE user = ?", user1, (err, rowUser1) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.get("SELECT balance FROM Bank WHERE user = ?", user2, (err, rowUser2) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // 检查 user1 和 user2 是否存在
            if (!rowUser1 || !rowUser2) {
                return res.status(404).json({ error: "User not found." });
            }

            // 检查 user1 的余额是否足够
            if (rowUser1.balance < money) {
                return res.status(400).json({ error: "Insufficient balance." });
            }

            // 开始转账
            db.serialize(() => {
                db.run("UPDATE Bank SET balance = balance - ? WHERE user = ?", [money, user1], (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    db.run("UPDATE Bank SET balance = balance + ? WHERE user = ?", [money, user2], (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }

                        res.json({ message: "Transfer successful." });
                    });
                });
            });
        });
    });
});


// 關閉資料庫連線
process.on('SIGINT', () => {
    db.close();
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
