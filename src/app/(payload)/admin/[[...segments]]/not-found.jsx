// src/app/(payload)/admin/[[...segments]]/not-found.jsx
import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

export const generateMetadata = ({ params, searchParams }) =>
    generatePageMetadata({ config, params, searchParams })

export default function NotFound({ params, searchParams }) {
    // Render using JSX instead of invoking it directly as a function
    return (
        <NotFoundPage
            config={config}
            params={params}
            searchParams={searchParams}
            importMap={importMap}
        />
    )
}