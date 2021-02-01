// All routes used throughout Lexicon

export const App = () => "/app"

export const Auth = () => "/auth"

export const Settings = () => "/app/settings"

export const CollectionManager = () => "/app/collection-manager"

export const CollectionManagerCreate = () => "/app/collection-manager/create"

export const CollectionManagerDetails = pathnameId => `/app/collection-manager/details/${pathnameId}`

export const findRouteParam = (currentUrl) => {
    const regex = /\d+/
    const match = currentUrl.match(regex)
    if (match !== null) {
        return match[0]
    }
}