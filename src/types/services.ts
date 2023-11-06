export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_services {
	landingPageUrl?: string,
	primaryPhoto?: ComplexImage,
	richTextDescriptionV2?: any,
	shortDescriptionV2?: any,
	slug?: string,
	name: string,
	c_featuredServices?: string[],
	c_imageUrl?: string,
	c_relatedDoctorsName?: string[],
	c_relatedFacilitiesName?: string[],
	c_servicesdoctors?: EntityReference[],
	c_servicesfacility?: EntityReference[],
	c_templateType?: string,
	id: string,
}
