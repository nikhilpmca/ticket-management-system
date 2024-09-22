// models/Ticket.js
const mongoose = require("mongoose");

// Define the Ticket schema
const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Title must be at least 5 characters long"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters long"],
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save middleware to update the updatedAt field on update
TicketSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Ticket", TicketSchema);
