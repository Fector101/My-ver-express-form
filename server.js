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
    .socials svg{
      overflow: visible;
      --size:36px;
      width: var(--size);
      height: var(--size);
      margin: 0 10px;

    }
    .socials svg.whatsapp{
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
        <img src="data:image/svg+xml,%3Csvg%20class%3D%22whatsapp%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20448%20512%22%3E%3Cpath%20d%3D%22M380.9%2097.1C339%2055.1%20283.2%2032%20223.9%2032c-122.4%200-222%2099.6-222%20222%200%2039.1%2010.2%2077.3%2029.6%20111L0%20480l117.7-30.9c32.4%2017.7%2068.9%2027%20106.1%2027h.1c122.3%200%20224.1-99.6%20224.1-222%200-59.3-25.2-115-67.1-157m-157%20341.6c-33.2%200-65.7-8.9-94-25.7l-6.7-4-69.8%2018.3L72%20359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2%200-101.7%2082.8-184.5%20184.6-184.5%2049.3%200%2095.6%2019.2%20130.4%2054.1s56.2%2081.2%2056.1%20130.5c0%20101.8-84.9%20184.6-186.6%20184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5%202.8s-14.3%2018-17.6%2021.8c-3.2%203.7-6.5%204.2-12%201.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8%205.7-9.1%2016.3-30.3%201.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7%201.4-14.8%206.9c-5.1%205.6-19.4%2019-19.4%2046.3s19.9%2053.7%2022.6%2057.4c2.8%203.7%2039.1%2059.7%2094.8%2083.8%2035.2%2015.2%2049%2016.5%2066.6%2013.9%2010.7-1.6%2032.8-13.4%2037.4-26.4s4.6-24.1%203.2-26.4c-1.3-2.5-5-3.9-10.5-6.6%22%2F%3E%3C%2Fsvg%3E" alt="WhatsApp logo"/>
        </a>

        <a href="https://github.com/Fector101" alt="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
        </a>
        
        <a href="https://x.com/OPieMonarch">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
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
      html: email_html(user_name)
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
