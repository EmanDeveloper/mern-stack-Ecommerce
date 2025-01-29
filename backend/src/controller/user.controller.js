import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncWrap } from "../utils/AsyncWrap.js";
import { sendEmail } from "../utils/Mailer.js";
import sendSMS from "../utils/PhoneMessage.js";

import { User } from "../model/user.model.js";

const signUp = AsyncWrap(async (req, res) => {
  const { username, email, phone, address, country, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password || !address || !country || !phone) {
    throw new apiError(400, "All field required");
  }

  // console.log(req.body)
  if (password.length < 6) {
    throw new apiError(400, "Password should be 6 character");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (user) {
    throw new apiError(400, "Username or email already exist!");
  }

  const newUser = new User({
    username,
    email,
    address,
    country,
    phone,
  });

  const createUser = await User.register(newUser, password);

  sendEmail(email);

  sendSMS(phone, "Welcome to thetaStore");

  const { hash, salt, ...userWithoutPassword } = createUser.toObject();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "😎 User signup successfully!", userWithoutPassword)
    );
});

const userLogin = AsyncWrap(async (req, res) => {
  if (!req.user) {
    throw new apiError("Invalid username or email");
  }

  const { hash, salt , ...sendUser}=req.user?.toObject();
  return res
    .status(200)
    .json(new ApiResponse(200, "User login success fully✌️",sendUser));
});

const userLogout = AsyncWrap(async (req, res) => {
  let check=false;
  req.logout((err) => {
    check=true;
    if (err) {
      throw new apiError(400, "Unauthrize request");
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, check,"User logout successfully 🙋"));
});

const forgetLogin = AsyncWrap(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email required!");
  }

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new apiError(400, "User with this email is not exist");
  }

  if (email) {
    const recoveryLink = `http://localhost:5173/resetLogin`; 
    const emailContent = `
      <h3>Username: ${findUser.username}</h3>
      <p>Please click on the link below to reset your login:</p>
      <a href="${recoveryLink}">Reset Login</a>
    `;
    sendEmail(email, emailContent);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Recovery Email is sended successfully!"));
});

const resetLogin = AsyncWrap(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new apiError(400, "Username or password is required");
  }

  if (password.length < 6) {
    throw new apiError(400, "Password should be 6 character");
  }

  const checkUser = await User.findOne({ username });

  if (!checkUser) {
    throw new apiError(400, "User of this username is not exist");
  }

  checkUser.username = username;

  await checkUser.setPassword(password);

  await checkUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "password reset success fully"));
});

const firstLogin = AsyncWrap(async (req, res) => {
  let check = true;

  if (!req.isAuthenticated()) {
    check = false;
    throw new apiError(400, "Please login ");
  }
  return res.status(200).json(new ApiResponse(200, check));
});

const sendBuydUser=AsyncWrap(async(req,res)=>{
  return res.status(200).json(new ApiResponse(200,req.user))
})

const checkLogin=AsyncWrap(async(req,res)=>{
  const check=true
  if(!req.isAuthenticated()){
    check=false;
}

return res.status(200).json(new ApiResponse(200,check))
})

export { signUp, userLogin,
   userLogout, forgetLogin,
    resetLogin, firstLogin,
    sendBuydUser,checkLogin };
