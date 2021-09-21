import dbConnect from 'utils/dbConnect';
import auth from 'utils/auth';
import User from 'models/user';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).json();
    return;
  }

  await dbConnect();
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name,
      email
    });

    res.status(200).json();
  } catch (error) {
    res.status(400).json();
  }
}

export default auth(handler);