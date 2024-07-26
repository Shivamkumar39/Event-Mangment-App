const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const server = express.Router();
const Event = require('../Schema/event')


// Middleware
server.use(express.json());

const postevent = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { eventname,organizername, status, postDate, lastDate, Eventdate, location, category, description, price, capacity } = req.body;
    const newImage = req.file ? req.file.filename : null;
     

    try {
        const orgnizerId = req.admin.id
        const newEvent = new Event({
            eventname,
            organizername,
            postDate,
            lastDate,
            Eventdate,
            location,
            category,
            description,
            price,
            capacity,
            status,
            image: newImage,
            orgnizerId
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const FetchDataById = async (req, res) => {
    try {
      const orgnizerId = req.admin.id
      const events = await Event.find({ "orgnizerId": orgnizerId }); // Find events by adminId
      return res.status(200).json({"data":events,"success":true})
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).send({ error: 'Server error' });
    }
};

//find by status

const EventOnging = async (req, res) => {
    try {
        const events = await Event.find({ status: 'ongoing' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const EventUpcoming =  async (req, res) => {
    try {
        const events = await Event.find({ status: 'upcoming' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const Eventcompleted= async (req, res) => {
    try {
        const events = await Event.find({ status: 'completed' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {postevent,  FetchDataById, EventOnging, Eventcompleted, EventUpcoming}