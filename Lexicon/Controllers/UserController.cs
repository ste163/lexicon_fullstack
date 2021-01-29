using Lexicon.Models;
using Lexicon.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Lexicon.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UserController(IUserRepository repo)
        {
            _repo = repo;
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            // GetAll is specifically for testing
            // Only User with Id of 1 (me and the test) will be able to access it.
            User attemptingUser = GetCurrentUser();

            if (attemptingUser.Id == 1)
            {
                List<User> users = _repo.Get();

                return Ok(users);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _repo.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId }, user);
        }

        [HttpDelete]
        public IActionResult Delete(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
