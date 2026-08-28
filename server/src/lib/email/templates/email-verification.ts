export const emailVerificationTemplate = ({
  username,
  code,
}: {
  username: string;
  code: string;
}) => {
  return `
<h1 style="margin-bottom:16px;">Welcome to Notey </h1>

<p>Hi <strong>${username}</strong>,</p>

<p>
Thanks for creating your Notey account.
Use the verification code below to verify your email address.
</p>

<div
style="
margin:32px 0;
padding:20px;
background:#f3f4f6;
border-radius:12px;
text-align:center;
font-size:32px;
font-weight:bold;
letter-spacing:8px;
font-family:monospace;
"
>
${code}
</div>

<p>
This code will expire in <strong>24 hours</strong>.
</p>

<p>
Never share this code with anyone.
Notey staff will never ask for your verification code.
</p>

<hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />

<p style="font-size:13px;color:#6b7280;">
If you didn't create a Notey account, you can safely ignore this email.
</p>`;
};
