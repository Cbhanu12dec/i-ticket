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
  if (file === undefined) {
    const ticketNumber = "INC" + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      title: ticketPayload.title,
      ticketNumber: ticketNumber,
      description: ticketPayload.description,
      priority: ticketPayload.priority,
      userCreated: ticketPayload.userCreated,
      status: "new",
      category: ticketPayload.category,
      assignee: ticketPayload.assignee,
      files: [],
      // comments: [],
    };
    return await TicketModel.create(payload);
  } else {
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
        userCreated: ticketPayload.userCreated,
        status: "new",
        category: ticketPayload.category,
        assignee: ticketPayload.assignee,
        files: [data?.Location],
        // comments: [],
      };
      return await TicketModel.create(payload);
    });
  }
};

exports.updateTicket = async (ticketPayload, file) => {
  if (file === undefined) {
    const files =
      JSON.parse(ticketPayload?.exsisting_files)?.length > 0
        ? [ticketPayload?.exsisting_files]
        : [];
    return await TicketModel.findOneAndUpdate(
      { ticketNumber: ticketPayload.ticketNumber },
      {
        $set: {
          title: ticketPayload.title,
          ticketNumber: ticketPayload.ticketNumber,
          description: ticketPayload.description,
          userCreated: ticketPayload.userCreated,
          priority: ticketPayload.priority,
          category: ticketPayload.category,
          assignee: ticketPayload.assignee,
          files: files,
        },
      }
    );
  } else {
    const params = {
      Bucket: "i-ticket/tickets",
      Key: file.originalname,
      Body: file.buffer,
    };

    const files = JSON.parse(ticketPayload?.exsisting_files);
    await s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
      }
      getS3Object = data;
      return await TicketModel.findOneAndUpdate(
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
            files: [...files, data?.Location],
          },
        }
      );
    });
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
  console.log("******* ticket payload", ticketPayload);
  return await TicketModel.findOneAndUpdate(
    { ticketNumber: ticketPayload.ticketNumber },
    {
      $set: {
        status: ticketPayload.status,
      },
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
