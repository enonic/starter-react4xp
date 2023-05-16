import type { Region } from '@enonic-types/lib-portal';


export interface PageComponentProps {
	regionsData: Record<string, Region>
	names: string
	tag: string
}
