import React from 'react'
import ListControls from '../../../components/lists/ListControls'
import ListCardContainer from '../../../components/lists/ListCardContainer'
import { CollectionManagerCreateRoute } from '../../../utils/Routes'

const ListColumn = ({
    history,
    searchTerms,
    setSearchTerms,
    projects,
    setSelectedProject,
    selectedProject,
    AppSelectedRoute,
    isFetchingCollections,
    collections }) => (
    <>
        <ListControls
            history={history}
            projects={projects}
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
            setSearchTerms={setSearchTerms}
            formUrlToPushTo={CollectionManagerCreateRoute}
            createNewString={'collection'} />

        <ListCardContainer
            history={history}
            searchTerms={searchTerms}
            urlToPushTo={AppSelectedRoute}
            isFetching={isFetchingCollections}
            items={collections}  />
    </>
)

export default ListColumn