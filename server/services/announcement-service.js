const AnnouncementModel = require("../models/annoucement-model");
exports.createAnnouncement = async (announcement) => {
  const doc = await AnnouncementModel.create(announcement);
  if (doc) {
    return await AnnouncementModel.find({});
  }
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
      return AnnouncementModel.find({});
    })
    .catch(() => {
      return "Failed to delete announcement.";
    });
};

exports.updateAnnouncementByID = async (payload) => {
  return await AnnouncementModel.findOneAndUpdate(
    { _id: payload.id },
    {
      $set: {
        title: payload?.title,
        description: payload?.description,
        assignee: payload?.assignee,
        startTime: payload?.startTime,
        endTime: payload?.endTime,
      },
    }
  )
    .then(() => {
      return AnnouncementModel.find({});
    })
    .catch(() => {
      return "Failed to updated announcement.";
    });
};
