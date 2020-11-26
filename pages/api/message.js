export default (req, res) => {
  res.json({ message: process.env.BACKEND_VARIABLE });
};
