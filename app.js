import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/profile", async (req, res) => {
  const username = req.body.name;

  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`);

    res.render("profile.ejs", {
      user: userRes.data,
      repos: repoRes.data
    });
  } catch (error) {
    res.send(`<p style="color:red;">User not found or API error.</p>`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
