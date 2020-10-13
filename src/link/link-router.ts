import express from "express";
import {
	GetLinksRequestParameters,
	GetLinksResult,
	LinkTypeEnum,
	PostLinkClassicData,
	PostLinkRequestBody,
} from "../types";

const data: GetLinksResult[] = [
	{
	id: "1",
	title: "something",
	type: LinkTypeEnum.CLASSIC,
	userId: "1",
	createdDate: new Date(),
	data: { url: "https://github.com/cadbox1" },
	},
];

const router = express.Router();

router.get("/", async (req, res) => {
	const { userId }: Partial<GetLinksRequestParameters> = req.query;
	// @todo impement sortedBy

	if (userId) {
		const results = data.filter(data => data.userId === userId);
		res.send({ results });
	} else {
		const results = data;
		res.send( { results });
	}
});

interface BodyValidationError {
	errors: FieldValidation[];
}

interface FieldValidation {
	field: string;
	message: string;
}

function getLinkClassicValidations(link: PostLinkRequestBody): FieldValidation[] {
	const fieldValidations: FieldValidation[] = [];

	const classicData: PostLinkClassicData = link.data as PostLinkClassicData;

	if (link.title.length > 144) {
		fieldValidations.push({
			field: "title",
			message: "title must be shorter than 144 chracters"
		})
	}

	// @todo validate url

	return fieldValidations;
}

router.post("/", async (req, res) => {
	const body: PostLinkRequestBody = req.body;

	let fieldValidations: FieldValidation[] = [];

	// @todo validate the general request

	if (body.type === LinkTypeEnum.CLASSIC) {
		const classicLinkValidations = getLinkClassicValidations(body);
		fieldValidations = [...fieldValidations, ...classicLinkValidations];
	}
	// @todo validate the other types

	if (fieldValidations.length) {
		const bodyValidationError: BodyValidationError = {
			errors: fieldValidations,
		}
		res.send(bodyValidationError);
		return;
	}

	const newLink: GetLinksResult = {
		...req.body,
		id: "2", // @todo implement uuid
		userId: "1",
		createdDate: new Date(),
	};

	data.push(newLink);

	res.send(newLink);
});

export { router as linkRouter };
