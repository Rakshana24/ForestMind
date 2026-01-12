const Office = require("../models/Office");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { district, forest, office, password } = req.body;

  console.log("Request body:", req.body);

  const officeAcc = await Office.findOne({
    officeName: office,
    forestName: forest,
  });

  console.log("Found office:", officeAcc);

  if (!officeAcc) {
    return res.status(400).json({ message: "Office not found" });
  }

  // Plain password check
  console.log("DB Password:", officeAcc.password);
  console.log("Entered Password:", password);

  if (password !== officeAcc.password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { office: officeAcc.officeName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
  message: "Login successful",
  token,
  office: officeAcc.officeName,
});

};
