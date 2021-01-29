using Lexicon.Models;
using System.Collections.Generic;

namespace Lexicon.Repositories
{
    public interface IUserRepository
    {
        List<User> Get();
        void Add(User user);
        void Delete(User user);

        User GetByFirebaseUserId(string firebaseUserId);
    }
}
