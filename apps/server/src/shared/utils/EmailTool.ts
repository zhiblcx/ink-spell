import * as nodemail from 'nodemailer';
import { EMAIL } from 'src/config';
interface userEmailType {
  code: string;
  password?: string;
  email: string;
  account: string;
}
class Email {
  private transporter = null;
  private updatePasswordByEmail = Array<userEmailType>();
  private registerEmail = Array<userEmailType>();

  getUpdatePasswordByEmail = (): userEmailType[] => {
    return this.updatePasswordByEmail;
  };

  getRegisterEmail = (): userEmailType[] => {
    return this.registerEmail;
  };

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

  async send({ email, html, account = null, subject = 'ink-spell' }) {
    const code = Math.random().toString().slice(-6);
    const options = {
      from: `${EMAIL.alias}<${EMAIL.user}>`,
      to: email,
      subject,
      html: html + `验证码为 ${code} 此验证码5分钟内有效`,
    };
    await this.transporter.sendMail(options, (error) => {
      if (error) {
        console.log('邮件发送失败');
      } else {
        // console.log('邮件发送成功');
        if (!account) {
          this.registerEmail.push({
            email,
            code,
            account,
          });
          setTimeout(() => {
            this.registerEmail.unshift();
          }, 30000);
        } else {
          this.updatePasswordByEmail.push({
            email,
            code,
            account,
          });
          setTimeout(() => {
            this.updatePasswordByEmail.unshift();
          }, 30000);
        }
      }
    });
  }
}

const email = new Email();

export default email;
