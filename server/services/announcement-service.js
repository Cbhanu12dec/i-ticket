const AnnouncementModel = require("../models/annoucement-model");
exports.createAnnouncement = async (announcement) => {
  return await AnnouncementModel.create(announcement);
};

exports.getAnnouncements = async () => {
  return await AnnouncementModel.find({});
};

exports.getAnnouncementByID = async (id) => {
  return await AnnouncementModel.findById(id);
};

exports.deleteAnnouncementByID = async (id) => {
  return await AnnouncementModel.findOneAndDelete({ id: id })
    .then(() => {
      return AnnouncementModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateAnnouncementByID = async (payload) => {
  return await AnnouncementModel.findOneAndUpdate(
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
      return AnnouncementModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
