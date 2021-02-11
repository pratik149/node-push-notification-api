const mongoose = require('mongoose')

const notificationDetailsSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	status: {
		type: Boolean
	},
	// Reason of failure
	reason: {
		type: String
	},
	// Message ID if success
	messageId: {
		type: String
	}
})

module.exports = mongoose.model('NotificationDetail', notificationDetailsSchema)