const nodemailer = require('nodemailer');
require('dotenv').config()

async function send(code, req){

    // Configuração do serviço de envio de emails (use um serviço de email real)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Código de Confirmação',
        text: `Seu código de confirmação é: ${code}`
    };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    // });
}

module.exports = {send}