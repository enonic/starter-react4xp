import {processHtml} from '/lib/enonic/react4xp';
import {get as getContentByKey} from '/lib/xp/content';
import {imageUrl} from '/lib/xp/portal';
import {toArray} from "/react4xp/utils/arrayUtils";
import {parentPath} from '/react4xp/utils/path';
import {PageDescriptor} from '@enonic-types/core';
import type {Content} from '@enonic-types/lib-content';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

function fetchAdditionalPhotos(photosIds) {
	return photosIds.map(photoId => {
		const photoContent = getContentByKey<Content>({key: photoId});
		return {
			_id: photoContent._id,
			title: photoContent.displayName,
			imageUrl: imageUrl({id: photoContent._id, scale: 'block(175, 175)'})
		};
	});
}

export const personProcessor: ComponentProcessorFunction<PageDescriptor>
	= (params) => {

	const photos: string[] = toArray<string>(params.content.data.photos as string | string[])
	const firstPhotoId = photos[0] || '';
	const remainingPhotoIds = photos.slice(1) || '';

	const {_id, displayName} = getContentByKey<Content>({key: firstPhotoId});

	const extraPhotos = fetchAdditionalPhotos(remainingPhotoIds);

	return {
		displayName: `${params.content.displayName}`,
		photo: {
			_id,
			title: displayName,
			imageUrl: imageUrl({id: _id, scale: 'block(1200, 675)'})
		},
		birthDate: params.content.data.dateofbirth,
		restPhotos: extraPhotos,
		parent: parentPath(params.request.path),
		bio: `${params.content.data.bio}`,
		bioHtml: processHtml({
			value: params.content.data.bio as string,
			imageWidths: [200, 400, 800],
		})
	};
};
