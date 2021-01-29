using Lexicon.Models;
using Lexicon.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

            if (attemptingUser == null)
            {
                return NotFound();
            }

            if (attemptingUser.Id != 1)
            {
                return NotFound();
            }

            List<User> users = _repo.Get();
            return Ok(users);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            // Must wrap in a Try/Catch because an Authorized user
            // Can make a Post request to make an account with the same email
            // If this happens, it throws an exception
            try
            {
                _repo.Add(user);
                return CreatedAtAction(
                    nameof(GetUser),
                    new { firebaseUserId = user.FirebaseUserId }, user);
            }
            catch (DbUpdateException e)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public IActionResult Delete(int Id)
        {
            var userRequestingDeletion = GetCurrentUser();

            if (userRequestingDeletion.Id != Id)
            {
                return NotFound();
            }

            _repo.Delete(userRequestingDeletion);
            return NoContent();
        }
    }
}
