import nodemailer from 'nodemailer'
const NODE_MAILDER_CONFIG =  {
    host: 'smtp.gmail.com',
    secureConnecton: true,
    port: 587,
    service: 'Gmail'
}
export default async (data : any): Promise<object> => {

    try {
        const { MAIL_ACCOUNT, MAIL_PASSWORD } = useRuntimeConfig()
        const mailServeice = nodemailer.createTransport({
            ...NODE_MAILDER_CONFIG,
            auth: {
                user: MAIL_ACCOUNT,
                pass: MAIL_PASSWORD,
            },
        })
        const {title, subject, text, to} = data
        const mailOptions = {
            from: `${title} | ${MAIL_ACCOUNT}`,
            to,
            subject,
            text,
        }
        const response = await mailServeice.sendMail(mailOptions)  
        console.log(`Email sent response : `, response)
        return {
            success: true,
            data : response
        }
    } catch (err : any) {
        console.log(`Email sent error : `, err)
        return {
            success: false,
            message : err.message || err
        }
    }
}

/** Example
 * await mailService({
      title: 'test',
      subject: 'test',
      text: 'test',
      to: "print88888888@gmail.com"
    })
 */