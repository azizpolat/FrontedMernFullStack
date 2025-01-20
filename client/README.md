const AutSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
try {
const { username, password, email } = req.body;
const user = await AutSchema.findOne({ email });
if (user) {
return res.status(404).json({ message: "Bu isimde kullanıcı var" });
}

    if (password.length < 6) {
      return res.status(404).json({ message: "Şifreniz En 6 karakter olmalıdır!!!" });
    }

    if (!isEmail(email)) {
      return res.status(404).json({ message: "Email Formata Uygun değil" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await AutSchema.create({ username, email, password: passwordHash });

    const token = await jwt.sign({ id: newUser._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(201).json({
      status: "Success",
      newUser: { newUser, message: "Yeni Kullancı Olustu" },
      token,
    });

} catch (error) {
return res.status(404).json({ message: error.message });
}
};

const login = async (req, res) => {
try {
const { email, password } = req.body;

    const user = await AutSchema.findOne(email);
    if (!user) {
      return res.status(404).json({ message: "Böyle Bir Kullanıcı Bulunamadı" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Pasaport yanlış. Lütfen Tekrar Giriniz" });
    }

    const token = await jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(200).json({
      status: "Success",
      newUser: { user, message: "Login Olundu" },
      token,
    });

} catch (error) {
return res.status(404).json({ message: error.message });
}
};

function isEmail(emailAdress) {
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (emailAdress.match(regexEmail)) {
return true;
} else {
return false;
}
}
