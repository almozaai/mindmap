const Sequelize = require("sequelize");
const db = require("../db");

const { STRING, UUID, UUIDV4, TEXT } = Sequelize;

const id = {
  type: UUID,
  defaultValue: UUIDV4,
  primaryKey: true
};

const Subject = db.define("subject", {
  id: id,
  name: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: TEXT,
    allowNull: false,
    defaultValue: "I am the center of your mindmap"
  }
});

module.exports = Subject;
