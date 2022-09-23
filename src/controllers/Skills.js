const datasource = require("../utils");

module.exports = {
  create: (req, res) => {
    const repository = datasource.getRepository("Skill");

    repository
      .query("INSERT INTO skill(name) VALUES (?)", [req.body.name])
      .then(
        (id) => {
          repository
            .query("SELECT * FROM skill WHERE id=?", [id])
            .then((data) => {
              res.json(data[0]);
            });
        },
        (err) => {
          console.error("Error: ", err);
          res.json({ success: false });
        }
      );
  },
  findAll: async (req, res) => {
    const repository = datasource.getRepository("Skill");

    // With SQL raw query
    /* repository.query("SELECT * FROM skill").then((data) => {
      res.json(data);
    }); */

    const skills = await repository.find({
      relations: ["upvotes", "upvotes.wilder"],
    });
    res.json(skills);
  },
  find: (req, res) => {
    const skillId = req.params.skillId;

    // find 1 skill by its ID
  },
  update: (req, res) => {
    /**
     * 2 options:
     * - raw SQL → UPDATE
     * - TypeORM: find + save
     */
  },
  delete: (req, res) => {
    /**
     * 2 options:
     * - raw SQL → DELETE
     * - TypeORM: find + remove
     */
  },
};
