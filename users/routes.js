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

  const register = async (req, res) => {
    try {
        const user = await dao.findUserByEmail(req.body.email);
        if (user) {
          return res.status(400).json({ message: "Email already taken, please log in" });
        }
        const currentUser = await dao.createUser(req.body);
        res.json(currentUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the user.'});
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const currentUser = await dao.findUserByCredentials(email, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const logout = (req, res) => {
    try {
      req.session.destroy();
      res.status(200).json({ message: 'Successfully signed out.' });
    } catch (error) {
      console.error('Sign out error:', error);
      res.status(500).json({ error: 'An error occurred during sign out.' });
    }
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users", register);
  app.post("/api/users", login);
  app.post("/api/users", logout);

}

export default UserRoutes;
