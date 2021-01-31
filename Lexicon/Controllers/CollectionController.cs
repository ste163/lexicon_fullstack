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
        // will have to check to ensure that a non-anonymous firebase user is making the request
        // otherwise send back a NonAuthorize response

        // also need to make seed data to populate the Categorization table
    }
}
