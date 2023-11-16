const TicketsModel = require("../models/tickets-model");
const AWS = require("aws-sdk");
const multer = require("multer");

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

const upload = multer({ storage: multer.memoryStorage() });

exports.createTicket = async (ticketPayload, file) => {
  const params = {
    Bucket: "i-ticket/tickets",
    Key: file.originalname,
    Body: file.buffer,
  };

  const ticketNumber = "INC" + Math.floor(100000 + Math.random() * 900000);

  await s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
    }
    getS3Object = data;
    const payload = {
      title: ticketPayload.title,
      ticketNumber: ticketNumber,
      description: ticketPayload.description,
      priority: ticketPayload.priority,
      category: ticketPayload.category,
      assignee: ["all"],
      files: [data?.Location],
      comments: [],
    };
    return await TicketsModel.create(payload);
  });
};

exports.getAllTickets = async () => {
  return await TicketsModel.find({});
};