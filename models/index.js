const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(Blog, { foreignKey: "blog_id" }); // Add the association to Blog
Blog.hasMany(Comment, { foreignKey: "blog_id" });

module.exports = { Comment, User, Blog };
//these are the tables that were used in the assignment and hw i connected it