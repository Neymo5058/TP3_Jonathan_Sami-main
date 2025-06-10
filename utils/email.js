// utils/email.js

const sendEmail = async (options) => {
  console.log('--- Simulated Email ---');
  console.log(`To: ${options.email}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Message:\n${options.message}`);
};

export default sendEmail;
