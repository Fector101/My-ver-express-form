const express= require('express')
const nodemailer=require('nodemailer')
const formParser=require('body-parser')
const cors=require('cors')
const app = express()
const port =3000


async function sendMail(send_to) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      to: send_to,
      from: 'fabianjoseph063@gmail.com',
      subject: 'Test Email',
      text: 'Hello, this is a test email sent from Node.js!'
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    // return { message: 'No error'+info.response };
    return true
 
  } catch (error) {
    console.error('Error sending email:', error);
    return false
 
  }
}
app.use(express.static('public'))
app.use(express.json())
app.use(formParser.urlencoded({extended:true})) //extended:true allows to accepts nested objects {user1:{name:'fabian'}}

app.use(cors({
            origin: 'https://my-ver-express-form.vercel.app',
            methods:['GET','POST']
            })
       )  // CORS is enable for all routes for protection from unauthorized access

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
app.get("/success", (req, res) => { 
    res.sendFile(__dirname+'/public/successful.html')

});

app.post("/submit", async(req, res) => {
    const sent_bool = await sendMail(req.body.email)
  console.log(__dirname)// trying to umderstand ports and routing
    sent_bool?res.sendFile(__dirname+'/public/successful.html'):res.sendFile(__dirname+'/public/failure.html')
});


app.get('/refill',async(req,res)=>{ 
  res.json(old_data_from_error);
})
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html')
})
app.use((req,res)=>{
  res.status(404).send('Page Sinked')
})

// export the app for vercel serverless functions
module.exports = app;
