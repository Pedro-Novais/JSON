const nodemailer = require('nodemailer');

async function send(code, req){

    // Configuração do serviço de envio de emails (use um serviço de email real)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'phnovais7@gmail.com',
            pass: 'viku cnlq yofp xgod'
        }
    });
 
    // Detalhes do email
    const mailOptions = {
        from: 'phnovais7@gmail.com',
        to: req.body.email,
        subject: 'Código de Confirmação',
        text: `Seu código de confirmação é: ${code}`
    };

    // Envie o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log(info.response)
    });
}

module.exports = {send}