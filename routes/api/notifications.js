// Imports
var express = require('express');
var router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../../service-account-key.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


/**
 * Send push notification to all devices, of all platforms.
 * 
 */
router.get('/send-to-all', function(req, res, next) {
	// Create a list containing up to 500 registration tokens.
	// These registration tokens come from the client FCM SDKs.
	const registrationTokens = ['cu-lltG7QbmJ9BSypDaK-G:APA91bHEEQDcdtW4hqaTOyo2IRhIygS4sZUvehjWCONykvgrlLRVa3C56eUFj6haFCxtVLFXJHAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP_Xgh2Se3HlLstomSXHhioZ']

	const message = {
		notification: {
			title: 'Holiday Offers!',
			body: 'Upto 50% OFF on shirts, bags and Accessories',
			image: 'https://c8.alamy.com/comp/KG34JA/christmas-sale-poster-holiday-discount-offer-shop-market-KG34JA.jpg'
		},
		tokens: registrationTokens
	};

	// Send a message to the device corresponding to the provided
	// registration tokens.
	admin.messaging().sendMulticast(message)
		.then((response) => {
			// The response is a BatchResponse whose responses list
			// corresponds to the order of the input tokens.
			console.log(response.successCount + ' messages were sent successfully');
			console.log('response object: ', response);
			if (response.failureCount > 0) {
				const failedTokens = [];
				response.responses.forEach((resp, idx) => {
				if (!resp.success) {
					failedTokens.push(registrationTokens[idx]);
				}
				});
				console.log('List of tokens that caused failures: ' + failedTokens);
			}
			res.status('200').send(response)
		})
		.catch((error) => {
			console.log('Error sending message:', error);
			res.status('400').send(error)
		});
});


module.exports = router;


/**
 * Reference Links:
 * 
 * Documentation link for building this app server for sending requests to FCM
 * https://firebase.google.com/docs/cloud-messaging/send-message
 * 
 * Documentation link for defining message payload:
 * https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages
 * 
 */