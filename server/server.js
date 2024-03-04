const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql');
const PORT = 8000;

// database connection...
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "evermore",
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected...");
    
    // const sql = "CREATE TABLE admin (id INT AUTO_INCREMENT PRIMARY KEY, email varchar(100), password varchar(100))";
    // const sql = "CREATE TABLE ratings (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT, rate DECIMAL(5, 2), count INT, FOREIGN KEY (product_id) REFERENCES products(id))"; // ratings to be added with foreign key(probably)...
    // const values = [
    //     [3, "Mens Casual Premium Slim Fit T-Shirts", "men's clothing", "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.", 109.95, "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"],
    //     [4, "Mens Cotton Jacket", "men's clothing", "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.", 169.95, "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"]
    // ];

    // conn.query(sql, function(err, result) {
    //     if (err) throw err;
    //     // console.log("Rating table created" + result.affectedRows);
    // });
});

// middleware function to allow the request from the client...
app.use(cors());

app.get('/api/home', (req, res) => {
    res.json({ message: "Hello world! "});
});

app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM admin  WHERE email = 'admin_kanak@gmail.com'";
    conn.query(sql, (err, data) => {
        if(err) return res.json(err);
        if(data.length == 0) return res.json({
            message: "No such user exists."
        })
        return res.json(data);
    })
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})