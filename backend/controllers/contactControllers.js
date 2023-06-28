const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = async (req, res) => {
  const { subject, message } = req.body;
  try {
    const user = await User.findById(req.user._id).select("-password");

    // Validation
    if (!user) {
      res.status(404);
      throw new Error("User not found, please login again");
    }

    if (!subject || !message) {
      res.status(400);
      throw new Error("Please fill the subject and message fields");
    }
    // Send email functionality
    // we can only send email from the email address
    // that we have verified in nodemailer
    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.email;
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res
      .status(200)
      .json({ success: true, message: "Contact email sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  contactUs,
};
