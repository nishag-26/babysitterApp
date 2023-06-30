const router = require("express").Router();

const mongoose = require("mongoose");

const BabysitterService = require("../models/BabysitterService.model");
const Booking = require("../models/Booking.model");

//  POST /api/projects  -  Creates a new babysitterService profile
router.post("/babysitterServices", (req, res, next) => {
  const {
    babysitterName,
    description,
    languages,
    yearsOfExperience,
    provideServiceFor,
    pricePerHour,
    supportServices,
  } = req.body;

  const newBabysitterService = {
    babysitterName: babysitterName,
    description: description,
    languages: languages,
    yearsOfExperience: yearsOfExperience,
    provideServiceFor: provideServiceFor,
    pricePerHour: pricePerHour,
    supportServices: supportServices,
  };

  BabysitterService.create(newBabysitterService)
    .then((response) => {
      res.status(201).json(response);
      console.log(response);
    })

    .catch((err) => {
      console.log("error creating a new babysitterService", err);
      res.status(500).json({
        message: "error creating a new babysitterService",
        error: err,
      });
    });
});

// GET /api/babysitterService -  Retrieves all of the babysitterService
router.get("/babysitterServices", (req, res, next) => {
  babysitterService
    .find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("error getting list of babysitters", err);
      res.status(500).json({
        message: "error getting list of babysitters",
        error: err,
      });
    });
});

//  GET /api/babysitterService/:babysitterServiceId  -  Get details of a specific babysitterService by id
router.get("/babysitterServices/:babysitterServiceId", (req, res, next) => {
  const { babysitterServiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(babysitterServiceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  babysitterService
    .findById(babysitterServiceId)
    .then((babysitter) => res.json(babysitterServiceId))
    .catch((err) => {
      console.log("error getting details of a babysitterService", err);
      res.status(500).json({
        message: "error getting details of a babysitterService",
        error: err,
      });
    });
});

// PUT /api/update/:babysitterServiceId  -  Updates a specific babysitter by id
router.put("/babysitterServices/:babysitterServiceId", (req, res, next) => {
  const { babysitterServiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(babysitterServiceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // const newDetails = {
  //     title: req.body.title,
  //     description: req.body.description,
  //     tasks: req.body.tasks
  // }

  BabysitterService.findByIdAndUpdate(babysitterServiceId, req.body, {
    new: true,
  })
    .then((updatedBabysitterService) => res.json(updatedBabysitterService))
    .catch((err) => {
      console.log("error updating babysitter service", err);
      res.status(500).json({
        message: "error updating babysitter service",
        error: err,
      });
    });
});

// Delete a specific project by id
router.delete("/babysitterServices/:babysitterServiceId", (req, res, next) => {
  const { babysitterServiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(babysitterServiceId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  BabysitterService.findByIdAndRemove(babysitterServiceId)
    // .then((deletedProject) => {
    //   return Task.deleteMany({ _id: { $in: deletedProject.tasks } });
    // })
    .then(() =>
      res.json({
        message: `Babysitter Service with id ${babysitterServiceId} has been removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting babysitter service", err);
      res.status(500).json({
        message: "error deleting babysitter service",
        error: err,
      });
    });
});

module.exports = router;