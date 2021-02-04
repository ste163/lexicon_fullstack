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

            // Check to ensure an unauthorized user (anonymous account) can not add a collection
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, Collection collection)
        {
            // Get current user
            var firebaseUser = _utils.GetCurrentUser(User);

            // Ensure an unauthorized user (anonymous account) can not update
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Collection Id coming from URL must match the Collection object's Id
            if (id != collection.Id)
            {
                return BadRequest();
            }

            // Get Collection by Id to ensure it's in db
            var collectionToUpdate = _collectionRepo.GetByCollectionId(id);

            // If it wasn't in the db don't let them update
            if (collectionToUpdate == null)
            {
                return NotFound();
            }

            // Get Collection's owner to ensure this is current user's collection
            var collectionOwner = collectionToUpdate.UserId;
            // Check if incoming user is the same one requesting deletion
            if (collectionOwner != firebaseUser.Id)
            {
                return NotFound();
            }

            // By using the collectionToUpdate we retrieved from the db,
            // we re-assign its values that are editable, based on the incoming collection
            collectionToUpdate.Name = collection.Name;
            collectionToUpdate.Description = collection.Description;

            try
            {
                _collectionRepo.Update(collectionToUpdate);
                return NoContent();
            }
            catch (DbUpdateException e)
            {
                return Unauthorized(); // When I get this error message in frontend, tell user the Name was already in db
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Get current user
            var firebaseUser = _utils.GetCurrentUser(User);

            // Check to ensure an unauthorized user (anonymous account) can not delete
            if (firebaseUser == null)
            {
                return NotFound();
            }

            // Get Collection by Id
            var collectionToDelete = _collectionRepo.GetByCollectionId(id);

            //Ensure we have this Collection
            if (collectionToDelete == null)
            {
                return NotFound();
            }

            // Get Collection's owner
            var collectionOwner = collectionToDelete.UserId;
            // Check if incoming user is the same one requesting deletion
            if (collectionOwner != firebaseUser.Id)
            {
                return NotFound();
            }

            // If you pass all those, you're the Collection owner and can delete it
            _collectionRepo.Delete(collectionToDelete);
            return NoContent();
        }
    }
}
