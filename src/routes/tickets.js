// routes/tickets.js

const express = require("express");
const Ticket = require("../models/Ticket");
const router = express.Router();

// Create a new ticket
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || title.length < 5) {
            return res.status(400).json({
                error: "Title is required and must be at least 5 characters",
            });
        }
        if (!description || description.length < 10) {
            return res.status(400).json({
                error: "Description is required and must be at least 10 characters",
            });
        }

        const newTicket = new Ticket({ title, description });
        const savedTicket = await newTicket.save();

        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tickets
router.get("/", async (_, res) => {
    try {
        const tickets = await Ticket.find();

        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single ticket by ID
router.get("/:id", async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket)
            return res.status(404).json({ message: "Ticket not found" });

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a ticket by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Validate input
        if (title && title.length < 5) {
            return res
                .status(400)
                .json({ error: "Title must be at least 5 characters" });
        }
        if (description && description.length < 10) {
            return res
                .status(400)
                .json({ error: "Description must be at least 10 characters" });
        }
        if (status && !["Open", "In Progress", "Closed"].includes(status)) {
            return res.status(400).json({
                error: "Invalid status. Must be Open, In Progress, or Closed",
            });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { title, description, status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedTicket)
            return res.status(404).json({ message: "Ticket not found" });

        res.json(updatedTicket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a ticket by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

        if (!deletedTicket)
            return res.status(404).json({ message: "Ticket not found" });

        res.json({ message: "Ticket deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
