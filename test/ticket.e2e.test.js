const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const chai = require("chai");
const app = require("../index"); // Import your Express app
const Ticket = require("../models/Ticket");

const expect = chai.expect;

let mongoServer;

describe("Ticket Management System E2E Tests", function () {
    // Before all tests: Set up in-memory MongoDB server and connect
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // After all tests: Close the database connection and stop the in-memory MongoDB server
    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    // Before each test: Clear the database
    beforeEach(async () => {
        await Ticket.deleteMany({});
    });

    // After each test: (Optional) if any additional cleanup is required
    afterEach(async () => {
        // Additional cleanup if needed
    });

    // E2E test cases go here...
    it("should create a new ticket with valid data", async () => {
        const res = await request(app).post("/api/tickets").send({
            title: "Login issue",
            description: "User cannot log in to the system.",
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("title").to.equal("Login issue");
        expect(res.body)
            .to.have.property("description")
            .to.equal("User cannot log in to the system.");
        expect(res.body).to.have.property("status").to.equal("Open");
    });

    it("should return 400 if title is missing", async () => {
        const res = await request(app).post("/api/tickets").send({
            description: "User cannot log in to the system.",
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
    });

    it("should retrieve all tickets", async () => {
        await Ticket.create({
            title: "Login issue",
            description: "User cannot log in to the system.",
        });

        const res = await request(app).get("/api/tickets");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(1);
        expect(res.body[0]).to.have.property("title").to.equal("Login issue");
    });

    it("should retrieve a single ticket by valid ID", async () => {
        const ticket = await Ticket.create({
            title: "Password reset issue",
            description: "User cannot reset password.",
        });

        const res = await request(app).get(`/api/tickets/${ticket._id}`);

        expect(res.status).to.equal(200);
        expect(res.body)
            .to.have.property("title")
            .to.equal("Password reset issue");
    });

    it("should return 404 for a non-existent ticket ID", async () => {
        const nonExistentId = mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/tickets/${nonExistentId}`);

        expect(res.status).to.equal(404);
        expect(res.body)
            .to.have.property("message")
            .to.equal("Ticket not found");
    });

    it("should update an existing ticket", async () => {
        const ticket = await Ticket.create({
            title: "Login issue",
            description: "User cannot log in to the system.",
        });

        const res = await request(app).put(`/api/tickets/${ticket._id}`).send({
            status: "In Progress",
            description: "Issue is being investigated.",
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status").to.equal("In Progress");
        expect(res.body)
            .to.have.property("description")
            .to.equal("Issue is being investigated.");
    });

    it("should return 404 if ticket to update does not exist", async () => {
        const nonExistentId = mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/api/tickets/${nonExistentId}`)
            .send({
                status: "In Progress",
            });

        expect(res.status).to.equal(404);
        expect(res.body)
            .to.have.property("message")
            .to.equal("Ticket not found");
    });

    it("should delete an existing ticket", async () => {
        const ticket = await Ticket.create({
            title: "Login issue",
            description: "User cannot log in to the system.",
        });

        const res = await request(app).delete(`/api/tickets/${ticket._id}`);

        expect(res.status).to.equal(200);
        expect(res.body)
            .to.have.property("message")
            .to.equal("Ticket deleted successfully");
    });

    it("should return 404 if ticket to delete does not exist", async () => {
        const nonExistentId = mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/tickets/${nonExistentId}`);

        expect(res.status).to.equal(404);
        expect(res.body)
            .to.have.property("message")
            .to.equal("Ticket not found");
    });
});
