"use strict";
const moment = require("moment");

function formatDate(date) {
  if (date) {
    Object.keys(date).forEach(key => {
      console.log(date[key])
      date[key] = moment(date[key]).format('YYYY-MM-DDTHH:mm:ss');
    });
  }
}

module.exports = { formatDate };
