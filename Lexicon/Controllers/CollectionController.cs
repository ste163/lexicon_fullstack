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
    }
}
