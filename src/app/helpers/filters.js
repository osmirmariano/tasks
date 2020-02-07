"use strict";
const moment = require("moment");

function formatDate(date) {
  if (date) {
    Object.keys(date).forEach(key => {
      date[key] = moment(date[key]).format("YYYY-MM-DD[T00:00:00.000Z]");
    });
  }
}

module.exports = { formatDate };
