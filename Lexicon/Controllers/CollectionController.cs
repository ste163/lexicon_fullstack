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
    [Route("api/[controller")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        // will have to check to ensure that a non-anonymous firebase user is making the request
        // otherwise send back a NonAuthorize response

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
            // Check if the User's Token says if they're anonymous or not
            // If anony, return NotAuthorized
            //ELSE get the User's stuff

            // need to use debugger and walk through how to grab the anonymous data
            // NEED TO MOVE THIS INTO THE GetCurrentUser util once I get it working
            var requestingUser = User;
           
            var firebaseUser = _utils.GetCurrentUser(User);

            List<Collection> collections = _collectionRepo.Get(firebaseUser.Id);

            if (collections == null)
            {
                return NotFound();
            }


            return Ok(collections);
        }
    }
}
