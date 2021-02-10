using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IUserRepository
    {
        // Get Users is for unit tests & has checks for only userId of 1 to access
        List<User> Get();
        void Add(User user);
        void Delete(User user);

        User GetByFirebaseUserId(string firebaseUserId);
    }
}
