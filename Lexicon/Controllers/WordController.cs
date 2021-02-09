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

        public WordController(IUserRepository userRep, IWordRepository wordRepo)
        {
            userRep = _userRepo;
            wordRepo = _wordRepo;
        }
    }
}
