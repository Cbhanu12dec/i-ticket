// const TicketModel = require("../models//tickets-model");
const { TicketModel } = require("../models/tickets-model");

const AWS = require("aws-sdk");
const multer = require("multer");

AWS.config.update({
  accessKeyId: "AKIAYULVJZAKYULF23YV",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

const upload = multer({ storage: multer.memoryStorage() });

exports.createTicket = async (ticketPayload, file) => {
  try {
    let files = [];
    const ticketNumber = "INC" + Math.floor(100000 + Math.random() * 900000);
    if (file === undefined) {
      files = [];
    } else {
      const params = {
        Bucket: "i-ticket/tickets",
        Key: file.originalname,
        Body: file.buffer,
      };
      const data = await s3.upload(params).promise();
      files.push(data?.Location);
    }

    const payload = {
      title: ticketPayload.title,
      ticketNumber: ticketNumber,
      description: ticketPayload.description,
      priority: ticketPayload.priority,
      userCreated: ticketPayload.userCreated,
      status: "new",
      category: ticketPayload.category,
      assignee: ticketPayload.assignee,
      files: files,
      // comments: [],
    };
    const doc = await TicketModel.create(payload);
    if (doc) {
      return await TicketModel.find({});
    }
  } catch (error) {
    console.error("Error creating TICKET:", error);
    return await TicketModel.find({});
  }
};

exports.updateTicket = async (ticketPayload, file) => {
  try {
    let files = [];
    if (file === undefined) {
      files =
        JSON.parse(ticketPayload?.exsisting_files)?.length > 0
          ? [...JSON.parse(ticketPayload?.exsisting_files)]
          : [];
    } else {
      const params = {
        Bucket: "i-ticket/tickets",
        Key: file.originalname,
        Body: file.buffer,
      };

      const data = await s3.upload(params).promise();
      files = JSON.parse(ticketPayload?.exsisting_files) || [];
      files.push(data?.Location);
    }
    const doc = await TicketModel.findOneAndUpdate(
      { ticketNumber: ticketPayload.ticketNumber },
      {
        $set: {
          title: ticketPayload.title,
          description: ticketPayload.description,
          ticketNumber: ticketPayload.ticketNumber,
          userCreated: ticketPayload.userCreated,
          priority: ticketPayload.priority,
          category: ticketPayload.category,
          assignee: ticketPayload.assignee,
          files: files,
        },
      }
    );
    if (doc) {
      return await TicketModel.find({});
    }
  } catch (error) {
    console.error("Error updating TICKET:", error);
    return await TicketModel.find({});
  }
};

exports.updateComments = async (ticketPayload) => {
  return await TicketModel.findOneAndUpdate(
    { ticketNumber: ticketPayload.ticketNumber },
    {
      $set: {
        comments: ticketPayload.comments,
      },
    }
  );
};
exports.updateTicketStatus = async (ticketPayload) => {
  return await TicketModel.findOneAndUpdate(
    { ticketNumber: ticketPayload.ticketNumber },
    {
      $set: {
        status: ticketPayload.status,
      },
    },
    {
      new: true,
    }
  );
  // if (doc) {
  //   return await TicketModel.find({});
  // }
};

exports.deleteTicket = async (id) => {
  return await TicketModel.findOneAndDelete({ ticketNumber: id })
    .then(() => {
      return TicketModel.find({});
    })
    .catch(() => {
      return "Failed to delete ticket.";
    });
};
exports.getAllTickets = async () => {
  return await TicketModel.find({});
};
