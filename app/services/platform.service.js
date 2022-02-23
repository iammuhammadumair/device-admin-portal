import axios from "axios";
import { UserKey, Sequelize } from "../models/index.js";

const filterPlatform = () => {};

const findUserKey = async (platform, userId) => {
	try {
		const data = await UserKey.findOne({
			where: {
				platform: platform,
				userid: userId,
			},
		});

		if (!data)
			throw {
				message: "User specific platform not found",
				code: 422,
			};
		return data;
	} catch (error) {
		console.log("error", error);
		throw { message: error.message, code: 422 };
	}
};

const findSmoobu = async (platform, userId) => {
	try {
		const userKey = await findUserKey(platform, userId);

		const config = {
			method: "get",
			url: "https://login.smoobu.com/api/apartment",
			headers: {
				"Api-Key": userKey.api_key_clientid, //user personal api key
				"Cache-Control": "no-cache",
			},
		};
		const response = await axios(config);
		let listings = [];
		const smoobuListing = response.data;
		for (let i = 0; i < smoobuListing.length; i++) {
			listings.push({
				id: smoobuListing.apartments[i].id,
				name: smoobuListing.apartments[i].name,
			});
		}
		return listings;
	} catch (error) {
		throw {
			message: error.message,
			code: 422,
		};
	}
};

const findHospitable = async (platform, userId) => {
	try {
		const userKey = await findUserKey(platform, userId);

		const data = JSON.stringify({
			client_id: userKey.api_key_clientid,
			client_secret: userKey.api_secret_key,
			audience: "api.hospitable.com",
			grant_type: "client_credentials",
		});

		const authConfig = {
			method: "post",
			url: "https://auth.hospitable.com/oauth/token",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
		const authResult = await axios(authConfig);
		const config = {
			method: "get",
			url: "https://api.hospitable.com/properties?include=listings",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authResult.data.access_token,
			},
		};

		const response = await axios(config);

		const hospitableListings = response.data;
		let listings = [];
		for (let i = 0; i < hospitableListings.length; i++) {
			listings.push({
				id: hospitableListings.data[i].id,
				name: hospitableListings.data[i].name,
			});
		}
		return listings;
	} catch (error) {
		throw {
			message: error.message,
			code: 422,
		};
	}
};

const findGuesty = async (platform, userId) => {
	try {
		const keyData = await findUserKey(platform, userId);

		const guestyAuth = Buffer.from(
			`${keyData.api_key_clientid}:${keyData.api_secret_key}`
		).toString("base64");

		const config = {
			method: "get",
			url: "https://api.guesty.com/api/v2/listings?limit=100",
			headers: {
				"Content-type": "application/json",
				Authorization: "Basic " + guestyAuth,
			},
		};

		const response = await axios(config);

		let listings = [];
		const guestyListings = response.data.results;
		for (let i = 0; i < guestyListings.length; i++) {
			listings.push({
				id: guestyListings.results[i]._id,
				name: guestyListings.results[i].title,
			});
		}
		return listings;
	} catch (error) {
		console.log("error =>", error);
		throw {
			message: error.message,
			code: 422,
		};
	}
};

export { filterPlatform, findUserKey, findSmoobu, findHospitable, findGuesty };
