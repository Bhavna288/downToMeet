const { json } = require("express");
const Registration = require("../models/Registration");
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const user_id = authData.user._id;
        const { eventId } = req.params;
        const date = new Date();

        const registration = await Registration.create({
          date: date,
          user: user_id,
          event: eventId
        });

        await registration
          .populate("event")
          .populate("user", "-password")
          .execPopulate();

        const ownerSocket = req.connectedUsers[registration.event.user];

        if(ownerSocket) {
          req.io.to(ownerSocket).emit('registration_request', registration);
        }

        return res.json(registration);
      }
    })
  },
  async getRegistration(req, res) {
    const { registrationId } = req.params;
    console.log(req.params);
    try {
      const registration = await Registration.findById(registrationId);
      await registration
        .populate("event")
        .populate("user", "-password")
        .execPopulate();
      return res.json(registration);
    } catch (error) {
      return res.send(400).send(json({ message: "Registration not found" }));
    }
  },
};
