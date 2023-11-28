import * as dao from "./dao.js";

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  //   const findUserById = async (req, res) => {
  //     const { userId } = req.params;
  //     const user = await dao.findUserById(userId);
  //     res.json(user);
  //   };

  //   const updateUser = async (req, res) => {
  //     const { userId } = req.params;
  //     const status = await dao.updateUser(userId, req.body);
  //     const currentUser = await dao.findUserById(userId);
  //     req.session["currentUser"] = currentUser;
  //     res.json(status);
  //   };

  app.get("/api/users", findAllUsers);
  // app.get("/api/users/:userId", findUserById);
  // app.put("/api/users/:userId", updateUser);
}

export default UserRoutes;
