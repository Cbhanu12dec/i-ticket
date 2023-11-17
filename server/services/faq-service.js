const FaqModel = require("../models/faq-model");

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

exports.createFaq = async (faq, file) => {
  const params = {
    Bucket: "i-ticket/faqs",
    Key: file.originalname,
    Body: file.buffer,
  };

  const faqNumber = "FAQ" + Math.floor(100000 + Math.random() * 900000);
  await s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
    }
    const payload = {
      title: faq.title,
      faqNumber: faqNumber,
      description: faq.description,
      isHidden: faq.isHidden,
      assignee: ["all"],
      files: [data?.Location],
      comments: [],
    };
    return await await FaqModel.create(payload);
  });
};

exports.getFaqs = async () => {
  return await FaqModel.find({});
};

exports.getFaqByID = async (id) => {
  return await FaqModel.findById(id);
};

exports.deleteFaqByID = async (id) => {
  return await FaqModel.findOneAndDelete({ id: id })
    .then(() => {
      return FaqModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateFaqByID = async (payload) => {
  return await FaqModel.findOneAndUpdate(
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
      return FaqModel.find({ type: "employee" });
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};
