using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public class IProjectCollectionRepository
    {
        // Get ProjectCollections for the current Project (by id)
        // Get ProjectCollections for the current Collection (by id)
        // Add
        // Delete

        // In our GetByIds in the Project and Collection controllers,
        // always run the get ProjCol by Id from here!

        // Ensure Project and Collection forms have a GetByUserId for the other's full list of info
        // to populate the drop-down. -- Use a drop-down menu for now, but I'd like to have a cleaner list
        // of them
        // MIGHT look good if they're grey buttons with X's to the right of them. That list out just like word buttons do.
        // I could then repeat these "Delete Buttons" when I hit "Edit" on a Collection so you could quickly delet un-wanted words
    }
}
