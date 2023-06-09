import otpServices from "../Services/OtpServices";
import HashService from "../Services/hashService";
import UserServices from "../Services/UserServices";
import TokenServices from "../Services/tokenServices";
import UserDto from "../dtos/User-dto";
class AuthController {
  static async sendOtp(req, res, next) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "phone field required" });
    }
    const otp = await otpServices.generateOtp();
    //hash
    const ttl = 1000 * 60 * 10; // time 2 min
    const expire = Date.now() + ttl;
    const data = `${phone}.${otp}.${expire}`;
    const hash = HashService.hashOtp(data);
    //send otp
    try {
      // await otpServices.sendBySms(phone,otp);
      res.json({ hash: `${hash}.${expire}`, otp, phone });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "message sending fail" });
    }
  }

  static async verifyOtp(req, res, next) {
    const { otp, phone, hash } = req.body;

    if (!otp || !phone || !hash) {
      res.status(400).json({ message: "All field are required" });
    }

    const [hashOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      res.status(401).json({ message: "OTP expired" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpServices.verifyOtp(hashOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid otp" });
    }
    let user;
    let accessToken;
    let refreshToken;
    try {
      user = await UserServices.findUser({ phone });
      if (!user) {
        user = await UserServices.createUser({ phone });
      }
    } catch (error) {
      console.log(err);
      res.status(500).json({ messsage: "DB error" });
    }
    // token
    accessToken = TokenServices.generateAccessToken({
      _id: user._id,
      activated: false,
    });
    refreshToken = TokenServices.generateRefressToken({
      _id: user._id,
      activated: false,
    });

    TokenServices.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httyOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httyOnly: true,
    });
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  static async refresh(req, res, next) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    
    // check if token is valid
    let userData;
    try {
      userData = await TokenServices.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token during verify" });
    }
    // Check if token is in db
    try {
      const token = await TokenServices.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token during searching database" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // check if valid user
    const user = await UserServices.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    // generate new token
   let accessToken = TokenServices.generateAccessToken({ _id: userData._id });
   let refreshToken = TokenServices.generateRefressToken({ _id: userData._id });

    // Update refresh token
    try {
      await TokenServices.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

     // response
     const userDto = new UserDto(user);
     res.json({ user: userDto, auth: true });
  }

 static async logout(req, res) {
    const { refreshToken } = req.cookies;
    // delete refresh token from db
    await TokenServices.removeToken(refreshToken);
    // delete cookies
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.json({ user: null, auth: false });
}
}

export default AuthController;
