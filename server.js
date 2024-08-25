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
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBkPSJNMzgwLjkgOTcuMUMzMzkgNTUuMSAyODMuMiAzMiAyMjMuOSAzMmMtMTIyLjQgMC0yMjIgOTkuNi0yMjIgMjIyIDAgMzkuMSAxMC4yIDc3LjMgMjkuNiAxMTFMMCA0ODBsMTE3LjctMzAuOWMzMi40IDE3LjcgNjguOSAyNyAxMDYuMSAyN2guMWMxMjIuMyAwIDIyNC4xLTk5LjYgMjI0LjEtMjIyIDAtNTkuMy0yNS4yLTExNS02Ny4xLTE1N3ptLTE1NyAzNDEuNmMtMzMuMiAwLTY1LjctOC45LTk0LTI1LjdsLTYuNy00LTY5LjggMTguM0w3MiAzNTkuMmwtNC40LTdjLTE4LjUtMjkuNC0yOC4yLTYzLjMtMjguMi05OC4yIDAtMTAxLjcgODIuOC0xODQuNSAxODQuNi0xODQuNSA0OS4zIDAgOTUuNiAxOS4yIDEzMC40IDU0LjEgMzQuOCAzNC45IDU2LjIgODEuMiA1Ni4xIDEzMC41IDAgMTAxLjgtODQuOSAxODQuNi0xODYuNiAxODQuNnptMTAxLjItMTM4LjJjLTUuNS0yLjgtMzIuOC0xNi4yLTM3LjktMTgtNS4xLTEuOS04LjgtMi44LTEyLjUgMi44LTMuNyA1LjYtMTQuMyAxOC0xNy42IDIxLjgtMy4yIDMuNy02LjUgNC4yLTEyIDEuNC0zMi42LTE2LjMtNTQtMjkuMS03NS41LTY2LTUuNy05LjggNS43LTkuMSAxNi4zLTMwLjMgMS44LTMuNyAuOS02LjktLjUtOS43LTEuNC0yLjgtMTIuNS0zMC4xLTE3LjEtNDEuMi00LjUtMTAuOC05LjEtOS4zLTEyLjUtOS41LTMuMi0uMi02LjktLjItMTAuNi0uMi0zLjcgMC05LjcgMS40LTE0LjggNi45LTUuMSA1LjYtMTkuNCAxOS0xOS40IDQ2LjMgMCAyNy4zIDE5LjkgNTMuNyAyMi42IDU3LjQgMi44IDMuNyAzOS4xIDU5LjcgOTQuOCA4My44IDM1LjIgMTUuMiA0OSAxNi41IDY2LjYgMTMuOSAxMC43LTEuNiAzMi44LTEzLjQgMzcuNC0yNi40IDQuNi0xMyA0LjYtMjQuMSAzLjItMjYuNC0xLjMtMi41LTUtMy45LTEwLjUtNi42eiIvPjwvc3ZnPg==" alt="WhatsApp"/>
        </a>

        <a href="https://github.com/Fector101" alt="Instagram">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTYgNTEyIj48cGF0aCBkPSJNMTY1LjkgMzk3LjRjMCAyLTIuMyAzLjYtNS4yIDMuNi0zLjMgLjMtNS42LTEuMy01LjYtMy42IDAtMiAyLjMtMy42IDUuMi0zLjYgMy0uMyA1LjYgMS4zIDUuNiAzLjZ6bS0zMS4xLTQuNWMtLjcgMiAxLjMgNC4zIDQuMyA0LjkgMi42IDEgNS42IDAgNi4yLTJzLTEuMy00LjMtNC4zLTUuMmMtMi42LS43LTUuNSAuMy02LjIgMi4zem00NC4yLTEuN2MtMi45IC43LTQuOSAyLjYtNC42IDQuOSAuMyAyIDIuOSAzLjMgNS45IDIuNiAyLjktLjcgNC45LTIuNiA0LjYtNC42LS4zLTEuOS0zLTMuMi01LjktMi45ek0yNDQuOCA4QzEwNi4xIDggMCAxMTMuMyAwIDI1MmMwIDExMC45IDY5LjggMjA1LjggMTY5LjUgMjM5LjIgMTIuOCAyLjMgMTcuMy01LjYgMTcuMy0xMi4xIDAtNi4yLS4zLTQwLjQtLjMtNjEuNCAwIDAtNzAgMTUtODQuNy0yOS44IDAgMC0xMS40LTI5LjEtMjcuOC0zNi42IDAgMC0yMi45LTE1LjcgMS42LTE1LjQgMCAwIDI0LjkgMiAzOC42IDI1LjggMjEuOSAzOC42IDU4LjYgMjcuNSA3Mi45IDIwLjkgMi4zLTE2IDguOC0yNy4xIDE2LTMzLjctNTUuOS02LjItMTEyLjMtMTQuMy0xMTIuMy0xMTAuNSAwLTI3LjUgNy42LTQxLjMgMjMuNi01OC45LTIuNi02LjUtMTEuMS0zMy4zIDIuNi02Ny45IDIwLjktNi41IDY5IDI3IDY5IDI3IDIwLTUuNiA0MS41LTguNSA2Mi44LTguNXM0Mi44IDIuOSA2Mi44IDguNWMwIDAgNDguMS0zMy42IDY5LTI3IDEzLjcgMzQuNyA1LjIgNjEuNCAyLjYgNjcuOSAxNiAxNy43IDI1LjggMzEuNSAyNS44IDU4LjkgMCA5Ni41LTU4LjkgMTA0LjItMTE0LjggMTEwLjUgOS4yIDcuOSAxNyAyMi45IDE3IDQ2LjQgMCAzMy43LS4zIDc1LjQtLjMgODMuNiAwIDYuNSA0LjYgMTQuNCAxNy4zIDEyLjFDNDI4LjIgNDU3LjggNDk2IDM2Mi45IDQ5NiAyNTIgNDk2IDExMy4zIDM4My41IDggMjQ0LjggOHpNOTcuMiAzNTIuOWMtMS4zIDEtMSAzLjMgLjcgNS4yIDEuNiAxLjYgMy45IDIuMyA1LjIgMSAxLjMtMSAxLTMuMy0uNy01LjItMS42LTEuNi0zLjktMi4zLTUuMi0xem0tMTAuOC04LjFjLS43IDEuMyAuMyAyLjkgMi4zIDMuOSAxLjYgMSAzLjYgLjcgNC4zLS43IC43LTEuMy0uMy0yLjktMi4zLTMuOS0yLS42LTMuNi0uMy00LjMgLjd6bTMyLjQgMzUuNmMtMS42IDEuMy0xIDQuMyAxLjMgNi4yIDIuMyAyLjMgNS4yIDIuNiA2LjUgMSAxLjMtMS4zIC43LTQuMy0xLjMtNi4yLTIuMi0yLjMtNS4yLTIuNi02LjUtMXptLTExLjQtMTQuN2MtMS42IDEtMS42IDMuNiAwIDUuOSAxLjYgMi4zIDQuMyAzLjMgNS42IDIuMyAxLjYtMS4zIDEuNi0zLjkgMC02LjItMS40LTIuMy00LTMuMy01LjYtMnoiLz48L3N2Zz4KICAgICAgIA==" alt="git hub" />
         
        </a>
        
        <a href="https://x.com/OPieMonarch">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMzg5LjIgNDhoNzAuNkwzMDUuNiAyMjQuMiA0ODcgNDY0SDM0NUwyMzMuNyAzMTguNiAxMDYuNSA0NjRIMzUuOEwyMDAuNyAyNzUuNSAyNi44IDQ4SDE3Mi40TDI3Mi45IDE4MC45IDM4OS4yIDQ4ek0zNjQuNCA0MjEuOGgzOS4xTDE1MS4xIDg4aC00MkwzNjQuNCA0MjEuOHoiLz48L3N2Zz4KICAgICAgICA=" alt="X" />
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
