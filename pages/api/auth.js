import Cookies from "universal-cookie";

export default (req, res) => {
  if (!process.env.PASSWORD) return res.status(200).json({ hasAccess: true });

  const cookies = new Cookies(req.headers.cookie);
  const password = cookies.get("fridge_blog_password") ?? "";

  return res.status(200).json({
    hasAccess: password === process.env.PASSWORD,
  });
};
