const express= require('express')
const nodemailer=require('nodemailer')
const formParser=require('body-parser')
const cors=require('cors')
const app = express()
const port =3000
const email_html=(user_name) =>`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    h1{
        line-height: 40px;
    }
    *{
      box-sizing: border-box;
    }
    .email-container {
      background-color: #ffffff;
      padding: 20px;
      margin: 30px auto;
      max-width: 600px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding: 20px;
      padding-bottom: 10px;
      background-color: #007bff;
      color: white;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .email-body {
      padding: 20px;
      text-align: center;
      background-color: #007bff1e;
    }
    .email-body h2 {
      color: #333;
    }
    .email-body p {
      color: #555;
      line-height: 1.6;
    }
    .email-footer {
      text-align: center;
      padding: 20px;
      background-color: #d3d7dc;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .button {
      background-color: #28a745;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
    }
    .socials {
      margin-top: 30px;
    }
    .socials a{
      display: inline-block;
    }
    .socials img{
      overflow: visible;
      --size:36px;
      width: var(--size);
      height: var(--size);
      margin: 0 10px;

    }
    .socials img.whatsapp{
      --fill-color:rgb(44, 202, 44);
      fill: var(--fill-color);
      background-color: white;
      padding: 5px;   
      border-radius: 60%;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1> ${user_name} <br> You for Registering!</h1>
    </div>
    <div class="email-body">
      <!-- <h2>Welcome to [Company Name]!</h2> -->
      <p>Your registration has been now confirmed.</p>
      <!-- <a href="https://yourwebsite.com/login" class="button">Go to Dashboard</a> -->
    </div>
    <div class="email-footer">
      <p>Follow us on social media for the latest updates!</p>
      <div class="socials">
        <a href="https://wa.me/2348112321825?text=Hi%20Fabian%2c%20I%27d%20like%20to%20">
        <img style="width: 36px; height: 36px;" class="whatsapp" src="cid:whatsapp" alt="WhatsApp Logo">
        </a>

        <a href="https://github.com/Fector101" alt="Instagram">
             <img style="width: 36px; height: 36px;" src="cid:github" alt="GitHub Logo">
        </a>
        
        <a href="https://x.com/OPieMonarch">
          <img style="width: 36px; height: 36px;" src="cid:xlogo" alt="X Logo">
        </a>
      </div>
      <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
    </div>
  </div>
</body>
</html>
`

async function sendMail(send_to,user_name) {
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
      html: email_html(user_name),
      attachments: [
  {
    filename: 'github.png',
    path: __dirname + '/public/img/github.png',
    cid: 'github' // Unique CID for embedding this image
  },
  {
    filename: 'X-logo.png',
    path: __dirname + '/public/img/X-logo.png',
    cid: 'xlogo' // Unique CID for embedding this image
  },
  {
    filename: 'WhatsApp.png',
    path: __dirname + '/public/img/WhatsApp.png',
    cid: 'whatsapp' // Unique CID for embedding this image
  }
]
      //text: 'Hello, this is a test email sent from Node.js!'
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
    const sent_bool = await sendMail(req.body.email,req.body['user-name'])
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
