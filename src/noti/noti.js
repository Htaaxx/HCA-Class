var push = require( 'pushsafer-notifications' );
// Function to send a notification
export async function sendNotification(title, message) {
  var p = new push( {
    k: '5pBkVM2AXZLWxFpsgDmD',             // your 20 chars long private key or 15 chars long alias key  (required)
    debug: true
  });
  
  var msg = {
    m: message,   // Message (required)
    t: title,     // Title (optional)
  };
  
  console.log( p );
  
  p.send( msg, function( err, result ) {
    //console.log( 'ERROR:', err );
    console.log( 'RESULT', result );
    // process.exit(0);
  });
}

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "vaughn.murphy@ethereal.email",
    pass: "BjkqBC9edYzahrnwKS",
  },
});

/**
 * Sends an email using Nodemailer.
 *
 * @param {string} recipient - The email address of the recipient.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} [html] - Optional HTML content of the email.
 * @returns {Promise<void>} - Resolves when the email is sent successfully.
 */
export async function sendEmail(recipient, subject, text, html = "") {
  try {
    const info = await transporter.sendMail({
      from: '"SmartClass" <hcaclass@ethereal.email>', // sender address
      to: recipient, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}