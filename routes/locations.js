const bearerTokenFormated = require("../apiCallObject");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Distance = require("geo-distance");

router.get("/location/result", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/locations?q=${req.query.q}`,
      bearerTokenFormated
    );
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.get("/location/hub", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/locations/hubs`,
      bearerTokenFormated
    );

    const arrayHubDistance = data.map(({ subtitle, coordinates }) => {
      return {
        subtitle,
        distance: Number(
          Distance.between(
            {
              lat: req.query.latitude,

              lon: req.query.longitude,
            },
            {
              lat: coordinates.latitude,

              lon: coordinates.longitude,
            }
          ).human_readable().distance
        ),
      };
    });

    arrayHubDistance.sort((a,b) => a.distance - b.distance)

    const hub = arrayHubDistance.find(element => element.distance < 2.5);

    const locationResult = {
      time : hub ? Math.ceil(hub.distance/15*60) : null,
    }
    
    res.status(200).json({ message: locationResult});
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
