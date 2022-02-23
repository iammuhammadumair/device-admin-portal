import {
	findSmoobu,
	findHospitable,
	findGuesty,
} from "../services/platform.service.js";
import {
	internalServerError,
	success,
	unprocessableEntity,
} from "../utils/response.util.js";
/**
 * Returns platform listing for a specific user
 */
const list = async (req, res) => {
	try {
		const { platform, userId = 1 } = req.query;
		let listings = [];
		switch (platform) {
			case "guesty":
				listings = await findGuesty(platform, userId);
				break;
			case "smoobu":
				listings = await findSmoobu(platform, userId);
				break;
			case "hospitable":
				listings = await findHospitable(platform, userId);
				break;
			case "tokeet":
				//todo
				res.status(200).send("Not implemented yet");
				break;
			case "hostfully":
				//todo
				res.status(200).send("Not implemented yet");
				break;
			case "hostaway":
				//todo
				res.status(200).send("Not implemented yet");
				break;
		}

		return res.send(
			success({
				data: listings,
			})
		);
	} catch (error) {
		console.log("error =>", error);
		if (error.code == 422)
			return res.send(unprocessableEntity({ message: error.message }));
		return res.send(
			internalServerError({
				message: error.message,
			})
		);
	}
};

export { list };
