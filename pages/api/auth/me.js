import auth from "utils/auth";

const handler = (req, res) => {
  const {id, name, email} = req.user;

  res.status(200).json({
    id,
    name,
    email
  });
}

export default auth(handler);