import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // must contain id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("AUTH HEADER:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("TOKEN:", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("DECODED:", decoded);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.log("JWT ERROR:", err.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
