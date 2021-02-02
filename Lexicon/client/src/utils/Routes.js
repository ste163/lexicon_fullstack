// All routes used throughout Lexicon
export const AuthRoute = () => "/auth"

export const AppRoute = () => "/app"

export const AppSelectedRoute = pathnameId => `/app/selected/${pathnameId}`

export const SettingsRoute = () => "/app/settings"

export const CollectionManagerRoute = () => "/app/collection-manager"

export const CollectionManagerCreateRoute = () => "/app/collection-manager/create"

export const CollectionManagerDetailsRoute = pathnameId => `/app/collection-manager/details/${pathnameId}`

export const CollectionManagerEditRoute = pathnameId => `/app/collection-manager/edit/${pathnameId}`

export const CollectionManagerDeleteRoute = pathnameId => `/app/collection-manager/delete/${pathnameId}`

export const findRouteParam = (currentUrl) => {
    const regex = /\d+/
    const match = currentUrl.match(regex)
    if (match !== null) {
        return match[0]
    }
}