const bcrypt = require("bcryptjs");
const { v4: uuidV4 } = require("uuid");
const crypto = require("crypto");
const createError = require("http-errors");
const sendEmail = require("../../../helper/sendMail");
const { response } = require("../../../helper/common");
const {
  findByEmail,
  create,
  findByToken,
  verifyingEmail,
} = require("../../../model/auth/register/register");
const { generateToken, generateRefershToken } = require("../../../helper/jwt");
const jwt = require("jsonwebtoken");

const authControllers = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const user = await findByEmail(email);
      if (user.rowCount > 0)
        throw next(new createError(401, "Email already used!"));
      const passwordHash = bcrypt.hashSync(password);
      const isVerified = false;
      const token = crypto.randomBytes(16).toString("hex");
      const data = {
        id: uuidV4(),
        name,
        email,
        passwordHash,
        isVerified,
        token,
      };
      const result = await create(data);
      sendEmail.sendConfirmationEmail(email, token);
      response(
        res,
        result.rows,
        200,
        "Register success please confirm your email",
        "success"
      );
    } catch (error) {
      next(error);
    }
  },
  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.params;
      const checkIsverified = await findByToken(token);
      if (checkIsverified.rowCount == 0)
        throw next(createError(500, "Verify token is invalid"));
      await verifyingEmail(token)
        .then(() => {
          res.send(`<center>
            <div>
              <h1>Activation Success</h1>
            </div>
            </center>`);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [users],
      } = await findByEmail(email);
      if (!users) throw next(new createError(400, "Email is invalid"));
      if (users.is_verified === false)
        throw next(new createError(400, "account not verified by email"));
      const isPassword = bcrypt.compareSync(password, users.password);
      if (!isPassword) throw next(new createError(400, "Password is in valid"));
      delete users.password;
      const payload = {
        id: users.id,
      };
      users.token = generateToken(payload);
      users.refreshToken = generateRefershToken(payload);
      response(res, users, 200, "login success", "success");
    } catch (error) {
      next(error);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      id: decoded.id,
    };
    const result = {
      token: generateToken(payload),
      refreshToken: generateRefershToken(payload),
    };
    res.send(result);
  },
};

module.exports = authControllers;
