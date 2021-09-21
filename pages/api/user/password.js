import dbConnect from 'utils/dbConnect';
import auth from 'utils/auth';
import User from 'models/user';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).json();
    return;
  }
  
  await dbConnect();
  const { password, newPassword } = req.body;

  try {
    if (!req.user.comparePassword(password)) {
      return res.status(400).json();
    }
    
    req.user.password = newPassword;
    await req.user.save();
    
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(400).json();
  }
}

export default auth(handler);