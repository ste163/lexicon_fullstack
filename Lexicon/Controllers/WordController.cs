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
            // Get current User
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

        [HttpPost("{id}")]
        public IActionResult Add(int id, Word word)
        {
            // Get current User
            var firebaseUser = _utils.GetCurrentUser(User);

            // Ensure an unauthorized user (anonymous account) can not add a collection
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Ensure the userId on the incoming word matches the person making the request
            if (word.UserId != firebaseUser.Id)
            {
                return BadRequest();
            }

            // Ensure the incoming collectionId matches the incoming word.CollectionId
            if (id != word.CollectionId)
            {
                return BadRequest();
            }

            // Get all of this user's words in this word
            var allWordsInCollection = _wordRepo.GetByCollectionId(id);

            // see if the MwWordId of the incoming word is in the db
            var wordWithThatMwId = allWordsInCollection.Find(w => w.MwWordId == word.MwWordId);

            // if there is a returned collection, we can't add because name isn't unique for this user
            if (wordWithThatMwId != null)
            {
                return BadRequest();
            }

            // Need to add the default requirements for the word here
            word.LastViewed = DateTime.Now;

            try
            {
                _wordRepo.Add(word);
                return Ok(word);
            }
            catch (DbUpdateException e)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSingleWord(int id)
        {
            // Get current User
            var firebaseUser = _utils.GetCurrentUser(User);

            // Ensure an unauthorized user (anonymous account) can not add a collection
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Get word by id
            var word = _wordRepo.GetWordById(id);

            // Ensure we have this word
            if (word == null)
            {
                return NotFound();
            }

            // Ensure the userId on the incoming word matches the person making the request
            if (word.UserId != firebaseUser.Id)
            {
                return BadRequest();
            }

            // If you pass all above, you're the word owner and can delete
            _wordRepo.DeleteSingleWord(word);
            return NoContent();
        }
    }
}
