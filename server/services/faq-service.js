const FaqModel = require("../models/faq-model");
const AWS = require("aws-sdk");
const multer = require("multer");

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

exports.createFaq = async (faq, file) => {
  if (file === undefined) {
    const faqNumber = "FAQ" + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      title: faq.title,
      faqNumber: faqNumber,
      description: faq.description,
      isHidden: true,
      assignee: faq.assignee,
      files: [],
    };
    return await FaqModel.create(payload);
  } else {
    const params = {
      Bucket: "i-ticket/faq",
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
        isHidden: true,
        assignee: faq.assignee,
        files: [data?.Location],
      };
      const doc = await await FaqModel.create(payload);
      if (doc) {
        return await FaqModel.find({});
      }
    });
  }
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
      return "Failed to delete faq.";
    });
};

exports.updateFaq = async (faq, file) => {
  if (file === undefined) {
    const files =
      JSON.parse(faq?.exsisting_files)?.length > 0
        ? [faq?.exsisting_files]
        : [];
    const doc = await FaqModel.findOneAndUpdate(
      { faqNumber: faq.faqNumber },
      {
        $set: {
          title: faq?.title,
          faqNumber: faq?.faqNumber,
          description: faq?.description,
          isHidden: faq?.isHidden,
          assignee: faq?.assignee,
          files: files,
        },
      }
    );
    if (doc) {
      return await FaqModel.find({});
    }
  } else {
    const params = {
      Bucket: "i-ticket/faq",
      Key: file?.originalname,
      Body: file?.buffer,
    };

    await s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
      }

      const files = JSON.parse(faq?.exsisting_files);

      const doc = await FaqModel.findOneAndUpdate(
        { faqNumber: faq.faqNumber },
        {
          $set: {
            title: faq?.title,
            faqNumber: faq?.faqNumber,
            description: faq?.description,
            isHidden: faq?.isHidden,
            assignee: faq?.assignee,
            files: [...files, data?.Location],
          },
        }
      );
      if (doc) {
        return await FaqModel.find({});
      }
    });
  }
};

exports.hideFaq = async (faq) => {
  const doc = await FaqModel.findOneAndUpdate(
    { faqNumber: faq.faqId },
    {
      $set: {
        isHidden: faq?.isHidden,
      },
    }
  );
  if (doc) {
    return await FaqModel.find({});
  }
};
