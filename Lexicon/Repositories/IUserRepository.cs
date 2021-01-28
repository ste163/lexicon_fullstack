using Lexicon.Models;

namespace Lexicon.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(User user);

        User GetByFirebaseUserId(string firebaseUserId);
    }
}
