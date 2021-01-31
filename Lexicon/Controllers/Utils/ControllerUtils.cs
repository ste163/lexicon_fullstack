using Lexicon.Models;
using Lexicon.Repositories;
using System.Security.Claims;

namespace Lexicon.Controllers.Utils
{
    public class ControllerUtils
    {
        private readonly IUserRepository _repo;

        public ControllerUtils(IUserRepository repo)
        {
            _repo = repo;
        }

        public User GetCurrentUser(ClaimsPrincipal userToken)
        {
            var firebaseUserId = userToken.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
