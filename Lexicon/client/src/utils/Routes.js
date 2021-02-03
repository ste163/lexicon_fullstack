// All string names (specifically for making deleting work easily)
export const CollectionManagerString = () => "collection-manager"

// All routes used throughout Lexicon
export const AuthRoute = () => "/auth"

export const AppRoute = () => "/app"

export const AppSelectedRoute = pathnameId => `${AppRoute()}/selected/${pathnameId}`

export const SettingsRoute = () => `${AppRoute()}/settings`

export const CollectionManagerRoute = () => `${AppRoute()}/${CollectionManagerString()}`

export const CollectionManagerCreateRoute = () => `${CollectionManagerRoute()}/create`

export const CollectionManagerDetailsRoute = pathnameId => `${CollectionManagerRoute()}/details/${pathnameId}`

export const CollectionManagerEditRoute = pathnameId => `${CollectionManagerRoute()}/edit/${pathnameId}`

export const CollectionManagerDeleteRoute = pathnameId => `${CollectionManagerRoute()}/delete/${pathnameId}`

export const findRouteParam = (currentUrl) => {
    const regex = /\d+/
    const match = currentUrl.match(regex)
    if (match !== null) {
        return match[0]
    }
}