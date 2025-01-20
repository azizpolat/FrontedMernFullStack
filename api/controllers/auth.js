const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Kullanıcı kontrolü
    const user = await AuthSchema.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "Bu isimde kullanıcı var" });
    }

    // Şifre uzunluk kontrolü
    if (password.length < 6) {
      return res.status(404).json({ message: "Şifreniz en az 6 karakter olmalıdır!" });
    }

    // E-posta format kontrolü
    if (!isEmail(email)) {
      return res.status(404).json({ message: "E-posta formatı uygun değil!" });
    }

    // Şifreyi hashle
    const passwordHash = await bcrypt.hash(password, 12);

    // Yeni kullanıcı oluştur
    const newUser = await AuthSchema.create({ username, email, password: passwordHash });

    // Token oluştur
    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "Success",
      newUser: { newUser, message: "Yeni Kullanıcı Oluşturuldu!" },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await AuthSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı" });
    }

    // Şifre kontrolü
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Şifre yanlış. Lütfen tekrar deneyiniz!" });
    }

    // Token oluştur
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(200).json({
      status: "Success",
      user: { user, message: "Başarıyla giriş yapıldı!" },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function isEmail(emailAdress) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(emailAdress);
}

module.exports = { register, login };
