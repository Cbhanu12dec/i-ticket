const FaqModel = require("../models/faq-model");
const AWS = require("aws-sdk");
const multer = require("multer");

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
      isHidden: false,
      assignee: faq.assignee,
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
  return await FaqModel.findOneAndDelete({ faqNumber: id })
    .then(() => {
      return FaqModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateFaq = async (faq, file) => {
  if (file === undefined) {
    const doc = await FaqModel.findOneAndUpdate(
      { faqNumber: faq.faqNumber },
      {
        $set: {
          title: faq?.title,
          faqNumber: faq?.faqNumber,
          description: faq?.description,
          isHidden: faq?.isHidden,
          assignee: faq?.assignee,
          files: [faq?.exsisting_files],
        },
      }
    );
  } else {
    const params = {
      Bucket: "i-ticket/faqs",
      Key: file?.originalname,
      Body: file?.buffer,
    };

    await s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
      }

      const doc = await FaqModel.findOneAndUpdate(
        { faqNumber: faq.faqNumber },
        {
          $set: {
            title: faq?.title,
            faqNumber: faq?.faqNumber,
            description: faq?.description,
            isHidden: faq?.isHidden,
            assignee: faq?.assignee,
            files: [faq?.exsisting_files, data?.Location],
          },
        }
      );

      console.log("******** updated docuyments", doc);
    });
  }
};
