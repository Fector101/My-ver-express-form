const express= require('express')
require('dotenv').config()
const nodemailer=require('nodemailer')
console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS)
function test(){
let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


let mailOptions = {
    from: 'piperham007@gmail.com',
    to: 'fabianjoseph063@gmail.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email sent from Node.js!'
  };
  
  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
const app = express()
const port =3000
const cors = require('cors');
app.use(cors());
function getData() {
  return { message: "Hello from the server! batman" };
}
app.use(express.static('public'))
app.get('/api/data', (req, res) => {
  const data = getData();
  res.json(data);
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
