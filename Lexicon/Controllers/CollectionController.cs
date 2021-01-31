using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Lexicon.Controllers
{
    [Authorize]
    [Route("api/[controller")]
    [ApiController]
    public class CollectionController
    {
    }
}
