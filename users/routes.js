import * as dao from "./dao.js";

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const currentUser = await dao.findUserByCredentials(email, password);
      if (currentUser) {
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users", login);
}

export default UserRoutes;
