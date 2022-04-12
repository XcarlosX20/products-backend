const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config({ path: '.env' })
const connectDB = require('./config/db')
const nodemailer = require('nodemailer')
const auth = require('./middleware/auth')
const { changeDate } = require('./helpers')
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// routes
app.set('port', process.env.PORT || 4000)

app.use('/api/products', require('./routes/products'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/requests', require('./routes/requests'))
app.use('/api/summary', require('./routes/summary'))
// app.post('/api/send-email', function (req, res) {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "carlossierra850@gmail.com",
//       pass: "carlos850"
//     }
//   });
//   let mailOptions = {
//       should be replaced with real recipient's account
//       to: 'ramonsierra2009@hotmail.com',
//       subject: req.body.subject,
//       text: req.body.message,
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message %s sent: %s', info.messageId, info.response);
//   });
//   res.send('received')
// });
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});