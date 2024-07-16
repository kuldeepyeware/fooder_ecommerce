import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://fooder-ecommerce.vercel.app/account/newVerification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email!",
    html: `<p> Click <a href="${confirmLink}"> here </a> to confirm email. </p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `https://fooder-ecommerce.vercel.app/account/newPassword?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p> Click <a href="${resetLink}"> here </a> to reset password. </p>`,
  });
};
