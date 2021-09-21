import jwt from 'jsonwebtoken';
import dbConnect from 'utils/dbConnect';
import User from 'models/user';


const check = async (req, res) => {
  await dbConnect();

  const decoded = jwt.decode(req.cookies?.accessToken, process.env.JWT_SECRET);
  if (decoded?.id) {
    const user = await User.findOne({
      _id: decoded.id
    });

    if (user) return user;
  }

  throw new Error();
}

const auth = (handler) => async (req, res) => {
  try {
    req.user = await check(req, res);
    return handler(req, res);
  } catch (error) {
    res.status(401).json();
  }
}

export default auth;