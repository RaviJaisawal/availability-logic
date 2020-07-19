"use strict";

const model = require('../model');

exports.get = async (req, res) => {
    const availabilityModel = model.availability
    try {
        const { userId } = req.query;
        const query = {
            userId: userId
        }
        availabilityModel.find(query, (err, result) => {
            if (err) {
                res.status(500).send({ success: false, msg: "Something went wrong get Availability find query", err: err });
            } else {
                res.status(200).send({ success: true, data: result });
            }

        })
    } catch (ex) {
        console.log(ex)
        res.status(500).send({ success: false, msg: "Something went wrong in Get Availability data ", err: ex });
    }
}


exports.getAllTRecordsBetweenStartEnd = async (req, res) => {
    const availabilityModel = model.availability
    try {
        const { startTime, endTime, userId } = req.body;
        // find the data with compare with start and end time.
        const query = [
            { $match: { userId: userId } },
            {
                $match: {
                    $or: [
                        {
                            $and: [
                                { startTime: { $lt: startTime } },
                                { endTime: { $gt: startTime } }

                            ]
                        },
                        {
                            $and: [
                                { startTime: { $lt: endTime } },
                                { endTime: { $gt: endTime } }

                            ]

                        }
                    ]
                }
            }
        ];

        availabilityModel.aggregate([query], (err, result) => {
            if (err) {
                res.status(500).send({ success: false, msg: "Something went wrong get the record find query", err: err });
            } else {
                const length = result.length || 0;
                if (result && length) {
                    // create a  new data set  
                    const data = {
                        startTime: result[0].startTime,
                        endTime: result[length - 1].endTime,
                        userId: userId
                    }

                    // get the results for delete the old record.
                    const ids = result.map((data) => data._id)
                    const query = {
                        _id: {
                            $in: ids
                        }
                    }
                    //fire the delete query
                    availabilityModel.deleteMany(query, (err, results) => {
                        if (err) {
                            res.status(500).send({ success: false, msg: "Something went wrong in deleteMany save Data", err: err });
                        } else {
                            // save the new records
                            const availabilityModelData = new availabilityModel(data);
                            availabilityModelData.save((err, result) => {
                                if (err) {
                                    res.status(500).send({ success: false, msg: "Something went wrong in save Data", err: err });
                                } else {
                                    res.send({ success: true, msg: "Availability data save successfully", results: result });
                                }

                            })
                        }

                    })

                } else {
                    // save the records with given post request.
                    const availabilityModelData = new availabilityModel(req.body);
                    availabilityModelData.save((err, result) => {
                        if (err) {
                            res.status(500).send({ success: false, msg: "Something went wrong in Availability save Data", err: err });
                        } else {
                            res.send({ success: true, msg: "Availability data save successfully", results: result });
                        }

                    })
                }
            }

        })
    } catch (ex) {
        console.log(ex)
        res.status(500).send({ success: false, msg: "Something went wrong in Get and Update the data ", err: ex });
    }
}



