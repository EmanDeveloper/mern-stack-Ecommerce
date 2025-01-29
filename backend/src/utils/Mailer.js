import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "memankhadim@gmail.com",
    pass: "ovvwymlifawccetp",
  },
});

async function sendEmail(email,text) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'thetaStore', // sender address
    to: email, // list of receivers
    subject: "Welcome by thetaStore ✔", // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export  {sendEmail};
