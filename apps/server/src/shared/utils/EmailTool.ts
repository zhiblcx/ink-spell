import * as nodemail from 'nodemailer';
import { EMAIL } from 'src/config';
export class Email {
  private transporter = null;

  constructor() {
    this.transporter = nodemail.createTransport({
      host: EMAIL.host,
      port: EMAIL.port,
      secure: EMAIL.secure,
      auth: {
        user: EMAIL.user,
        pass: EMAIL.pass,
      },
    });
  }

  async send({ email, subject = 'ink-spell', html, emailObj, userId = -1 }) {
    const code = Math.random().toString().slice(-6);
    const options = {
      from: `${EMAIL.alias}<${EMAIL.user}>`,
      to: email,
      subject,
      text: ``,
      html: html + `验证码为 ${code} 此验证码5分钟内有效`,
    };
    await this.transporter.sendMail(options, (error) => {
      if (error) {
        console.log('邮件发送失败');
      } else {
        console.log('邮件发送成功');
        emailObj.push({
          email,
          code,
          userId,
        });
        setTimeout(() => {
          emailObj.unshift();
        }, 30000);
      }
    });
  }
}
