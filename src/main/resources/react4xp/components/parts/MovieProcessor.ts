import {get as getContentByKey} from '/lib/xp/content';
import {imageUrl, pageUrl} from '/lib/xp/portal';
import {toArray} from "/react4xp/utils/arrayUtils";
import type {Content} from '@enonic-types/lib-content';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

function fetchAdditionalPhotos(photoIds: string[]) {
	return photoIds.map(photoId => {
		const photoContent = getContentByKey<Content>({key: photoId});
		return {
			_id: photoContent._id,
			title: photoContent.displayName,
			imageUrl: imageUrl({id: photoContent._id, scale: 'block(340, 220)'}) // Image scaled for remaining photos
		};
	});
}

export const movieProcessor: ComponentProcessorFunction<'com.enonic.app.hmdb:movie-details'> = (params) => {
	const data = params.content.data;

	// Extract the photos from content.data
	const photos: string[] = toArray<string>(data.photos as string | string[]);
	const firstPhotoId = photos[0] || ''; // First photo ID
	const remainingPhotoIds: string[] = photos.slice(1); // Remaining photo IDs

	// Fetch the first photo
	const firstPhotoContent = getContentByKey<Content>({key: firstPhotoId});
	const firstPhoto = firstPhotoContent
					   ? {
			_id: firstPhotoContent._id,
			title: firstPhotoContent.displayName,
			imageUrl: imageUrl({id: firstPhotoContent._id, scale: 'block(800, 1200)'}), // Larger scale for first photo
			id: firstPhotoContent._id
		}
					   : null;

	// Fetch remaining photos
	const restphotos = fetchAdditionalPhotos(remainingPhotoIds);


	// Process the cast
	const cast = toArray<any>(data.cast).map(castMember => {
		const actorContent = getContentByKey<Content>({key: castMember.actor});


		const photos: string[] = toArray<string>(actorContent.data.photos as string | string[])
		const firstPhotoId = photos[0] || ''; // Safely access the first ID


		return {
			actorName: actorContent.displayName,
			photoUrl: imageUrl({id: firstPhotoId, scale: 'block(150, 150)'}),
			character: castMember.character,
			id: actorContent._id,
			castUrl: pageUrl({path: actorContent._path})
		};
	});

	// Handle director only if it exists
	let director = null; // Default case if no director is available
	if (data.director) {
		// Execute lines 92-114 here
		const directorId = data.director as string; // Director ID from the "data" object

		const result = getContentByKey<Content>({key: directorId});


		const directorPhotos: string[] = toArray<string>(result.data.photos as string | string[])
		const firstDirectorPhoto = directorPhotos[0];
		const directorTitle = result.displayName;
		const directorUrl = pageUrl({path: result._path});

		director = {
			name: directorTitle,
			url: directorUrl,
			photo: imageUrl({id: firstDirectorPhoto, scale: 'block(300, 200)'})
		};
	}

	return {
		name: params.content.displayName,
		subtitle: data.subtitle,
		trailer: data.trailer,
		abstract: data.abstract,
		release: data.release,
		photo: firstPhoto, // First photo
		restphotos, // Remaining photos
		website: data.website,
		cast, // Cast members,
		director // Only include director if it exists
	};
};

