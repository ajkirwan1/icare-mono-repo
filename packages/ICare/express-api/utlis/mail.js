import { ServerClient } from "postmark";

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

export async function sendEmail({ to, subject, html, text }) {
  return client.sendEmail({
    From: process.env.MAIL_FROM, // e.g. "ICare <news@icare.com>"
    To: to,
    Subject: subject,
    HtmlBody: html,
    TextBody: text,
    MessageStream: "outbound"
  });
}
