const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(express.json());
app.use(helmet());
app.use('/', cors());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'mbdb', // See members.sql in front part
  port: '3306',
});

// Create
app.post('/create', (req, res) => {
  const { name, email, work, phone, gender, children, comment } = req.body

  db.query(
    'INSERT INTO members(name, email, work, phone, gender, children, comment) VALUES(?,?,?,?,?,?,?)',
    [name, email, work, phone, gender, children, comment],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

// Read
app.get('/members', (req, res) => {
  db.query('SELECT * FROM members', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/member/:id', (req, res) => {
  db.query(`SELECT * FROM members WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// Update
app.put('/update/:id', (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    work: req.body.work,
    phone: req.body.phone,
    gender: req.body.gender,
    children: req.body.children,
    comment: req.body.comment,
  };

  db.query(
    `UPDATE members SET ? WHERE id=${req.params.id}`,
    data,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

// Delete
app.delete('/delete/:id', (req, res) => {
  db.query(`DELETE FROM members WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3005, () => {
  try {
    console.log('server working on port 3005');
  } catch (error) {
    console.log(error);
  }
});
