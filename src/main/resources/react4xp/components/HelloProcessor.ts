// File: src/main/resources/react4xp/components/HelloProcessor.ts
import {PageDescriptor} from '@enonic-types/core';
import type {ComponentProcessorFunction} from '@enonic-types/lib-react4xp/DataFetcher';

export const helloProcessor: ComponentProcessorFunction<PageDescriptor> = (params) => {
	return {
		title: `${params.content.displayName}`,
		text: 'Welcome to the React4XP starter!',
		// Added a new property for the bottle count
		initialCount: 99,
	};
};
