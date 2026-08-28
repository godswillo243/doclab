export const getWrapper = ({
  children,
  title,
}: {
  children: string;
  title: string;
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
  </head>

  <body style="margin:0;padding:40px 16px;background:#f8fafc;font-family:Arial,sans-serif;color:#1f2937;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:40px;border-radius:16px;">

            <tr>
              <td>
                ${children}
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

    <p style="font-size:13px;color:#6b7280;">
    Thanks for using Doclab.
    </p>


  </body>
</html>
`;
