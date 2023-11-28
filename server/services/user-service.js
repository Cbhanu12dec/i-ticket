const UsersModel = require("../models/users-model");
exports.createUsers = async (users) => {
  const usersData = {
    userID: "USR" + Math.floor(100000 + Math.random() * 900000),
    firstName: users?.firstName,
    lastName: users?.lastName,
    email: users?.email,
    phoneNumber: users?.phoneNumber,
    password: users?.password,
    role: users?.role,
  };
  return await UsersModel.create(usersData);
};

exports.uploadUsers = async (users) => {
  const preparedData = users.map((item) => {
    return {
      userID: "USR" + Math.floor(100000 + Math.random() * 900000),
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      password: item?.password,
      role: item.role,
    };
  });
  return await UsersModel.insertMany(preparedData);
};

exports.getsUsers = async (users) => {
  return await UsersModel.find({});
};

exports.getUsersByEmail = async (email) => {
  return await UsersModel.find({ email: email });
};
exports.login = async (payload) => {
  const email = payload?.email;
  const response = await UsersModel.find({ email: email });
  if (
    response &&
    response[0]?.email === email &&
    response[0].password === payload?.password
  ) {
    return response;
  } else {
    return "FAILED_LOGIN";
  }
};
exports.deleteUserByID = async (id) => {
  return await UsersModel.findOneAndDelete({ id: id })
    .then(() => {
      return UsersModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateUserAccess = async (payload) => {
  try {
    const updatedDocument = await UsersModel.findOneAndUpdate(
      { email: payload.email },
      {
        $set: {
          role: payload.role,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedDocument) {
      return "User access could not update";
    }

    return updatedDocument;
  } catch (error) {
    console.error(error);
    return "Internal Server Error";
  }
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
      return UsersModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
