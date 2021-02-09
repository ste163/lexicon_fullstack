// All route names (specifically for making deleting work easily)
export const CollectionManagerString = () => 'collection-manager'
export const ProjectManagerString = () => 'project-manager'
export const WordString = () => 'word'

// All routes used throughout Lexicon
export const AuthRoute = () => '/auth'

export const AppRoute = () => '/app'

export const AppSelectedRoute = pathnameId => `${AppRoute()}/selected/${pathnameId}`

export const SettingsRoute = () => `${AppRoute()}/settings`

// Word delete
export const WordDeleteRoute = pathnameId => `${AppRoute()}/${WordString()}/delete/${pathnameId}`

// Collection Manager
export const CollectionManagerRoute = () => `${AppRoute()}/${CollectionManagerString()}`

export const CollectionManagerCreateRoute = () => `${CollectionManagerRoute()}/create`

export const CollectionManagerDetailsRoute = pathnameId => `${CollectionManagerRoute()}/details/${pathnameId}`

export const CollectionManagerEditRoute = pathnameId => `${CollectionManagerRoute()}/edit/${pathnameId}`

export const CollectionManagerDeleteRoute = pathnameId => `${CollectionManagerRoute()}/delete/${pathnameId}`


// Project Manager
export const ProjectManagerRoute = () => `${AppRoute()}/${ProjectManagerString()}`

export const ProjectManagerCreateRoute = () => `${ProjectManagerRoute()}/create`

export const ProjectManagerDetailsRoute = pathnameId => `${ProjectManagerRoute()}/details/${pathnameId}`

export const ProjectManagerEditRoute = pathnameId => `${ProjectManagerRoute()}/edit/${pathnameId}`

export const ProjectManagerDeleteRoute = pathnameId => `${ProjectManagerRoute()}/delete/${pathnameId}`


// Utility Methods
export const findRouteParam = (currentUrl) => {
    const regex = /\d+/
    const match = currentUrl.match(regex)
    if (match !== null) {
        return match[0]
    }
}