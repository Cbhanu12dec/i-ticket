const UsersModel = require("../models/users-models.js");
exports.createUsers = async (users) => {
  return await UsersModel.create(users);
};

exports.getsUsers = async (users) => {
  return await UsersModel.find({});
};

exports.getUsersByID = async (id) => {
  return await UsersModel.find({ email: id });
};

exports.deleteUserByID = async (id) => {
  return await UsersModel.findOneAndDelete({ id: id })
    .then(() => {
      return UsersModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateUserByID = async (payload) => {
  return await UsersModel.findOneAndUpdate(
    { id: payload.id },
    {
      $set: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        credits: payload.credits,
        address: payload.address,
        type: payload.type,
        subtype: payload.subtype,
        salary: payload.salary,
        about: payload.about,
      },
    }
  )
    .then(() => {
      return UsersModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
