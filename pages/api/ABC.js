export default function (req, res) {
  res.status(200).json("env " + process.env.name);
}
