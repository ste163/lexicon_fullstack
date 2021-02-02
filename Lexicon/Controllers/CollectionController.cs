using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Lexicon.Repositories;
using Lexicon.Controllers.Utils;
using Lexicon.Models;

namespace Lexicon.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly ICollectionRepository _collectionRepo;
        private readonly ControllerUtils _utils;

        public CollectionController(IUserRepository userRepo, ICollectionRepository collectionRepo)
        {
            _userRepo = userRepo;
            _collectionRepo = collectionRepo;
            _utils = new ControllerUtils(_userRepo);
        }

        [HttpGet]
        public IActionResult GetByUserId()
        {           
            var firebaseUser = _utils.GetCurrentUser(User);

            if (firebaseUser == null)
            {
                return NotFound();
            }

            List<Collection> collections = _collectionRepo.Get(firebaseUser.Id);

            if (collections == null)
            {
                return NotFound();
            }

            return Ok(collections);
        }

        [HttpGet("{id}")]
        public IActionResult GetByCollectionId(int id)
        {
            var firebaseUser = _utils.GetCurrentUser(User);

            // If this person is an anonymous user, return NotFound
            if (firebaseUser == null)
            {
                return NotFound();
            }

            Collection collection = _collectionRepo.GetByCollectionId(id);

            // If no matching collection, return not found
            if (collection == null)
            {
                return NotFound();
            }

            // If this is not that user's post, don't return it
            if (collection.UserId != firebaseUser.Id)
            {
                return NotFound();
            }

            // When I get my Words working, I'll have to ensure I'm also bringing back the full word list
            return Ok(collection);
        }

        [HttpPost]
        public IActionResult Add(Collection collection)
        {
            var firebaseUser = _utils.GetCurrentUser(User);

            // Check to ensure an authorized user (anonymous account) can not add a collection
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Need to add the default requirements for the collection here
            collection.CategorizationId = 1;
            collection.CreationDate = DateTime.Now;

            try
            {
                _collectionRepo.Add(collection);
                return Ok(collection);
            }
            catch (DbUpdateException e)
            {
                return NotFound();
            }
        }
    }
}
