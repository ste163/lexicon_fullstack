using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Lexicon.Repositories;
using Lexicon.Controllers.Utils;
using Lexicon.Models;
using Lexicon.Models.ViewModels;
using System.Linq;

namespace Lexicon.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IWordRepository _wordRepo;
        private readonly ControllerUtils _utils;

        public WordController(IUserRepository userRepo, IWordRepository wordRepo)
        {
            _userRepo = userRepo;
            _wordRepo = wordRepo;
            _utils = new ControllerUtils(_userRepo);
        }

        [HttpGet("{id}")]
        public IActionResult GetAllWordsByCollectionId(int id)
        {
            var firebaseUser = _utils.GetCurrentUser(User);

            // If this person is an anonymous user, return NotFound
            if (firebaseUser == null)
            {
                return NotFound();
            }

            try
            {
                // If a user attempts to get an Id not in the db, causes a NullReferenceException error
                List<Word> words = _wordRepo.GetByCollectionId(id);

                // If  collection, return not found
                if (words == null)
                {
                    return NotFound();
                }

                // If this is not that user's post, don't return it
                if (words[0].UserId != firebaseUser.Id)
                {
                    return NotFound();
                }

                return Ok(words);
            }
            catch (NullReferenceException e)
            {
                return NotFound();
            }
        }
    }
}
