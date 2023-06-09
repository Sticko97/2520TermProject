let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderUpdate = database.cindy.reminders.find((reminder) => reminder.id == req.params.id);
    reminderUpdate.title = req.body.title;
    reminderUpdate.description = req.body.description;
    reminderUpdate.completed = req.body.completed === true
    res.redirect("/reminders");
    // implement this code.
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToDelete = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToDelete;
    }
    );
    if (searchResult != undefined) {
      database.cindy.reminders.splice(searchResult, 1);
      res.redirect("/reminders");
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },
};

module.exports = remindersController;
