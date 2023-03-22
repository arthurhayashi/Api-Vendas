import nodemailer from "nodemailer"
import HandleBarMailTemplate from "./HandlebarMailTemplate";
interface IsendMail{
    to:IMailContact;
    from?: IMailContact;
    subject : string;
    templateData:IParseMailTemplate;
}
interface ITemplateVariable{
    [key:string]: string |number;

}

interface IParseMailTemplate{
    file:string;
    variables:ITemplateVariable;
}
interface IMailContact{
    name:string;
    email:string;
}

export default class EtherealMail{
    static async sendMail({to,from,subject,templateData}:IsendMail):Promise<void>{
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandleBarMailTemplate();
        const transporter = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            auth:{
                user: account.user,
                pass: account.pass
            }
        });
        
        const message = await transporter.sendMail({
            from: {
                name:from?.name ||'Equipe API Vendas',
                address: from?.email ||'equipe_vendas@apivendas.com.br',
            },  
            to:{
                name: to.name,
                address:to.email,
            },
            subject,
            html:await mailTemplate.parse(templateData)
        });
        console.log('Message send: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}