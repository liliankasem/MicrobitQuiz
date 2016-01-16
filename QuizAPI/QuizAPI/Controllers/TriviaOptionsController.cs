using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    public class TriviaOptionsController : ApiController
    {
        private QuizAPIContext db = new QuizAPIContext();

        // GET: api/TriviaOptions
        public IQueryable<TriviaOption> GetTriviaOptions()
        {
            return db.TriviaOptions;
        }

        // GET: api/TriviaOptions/5
        [ResponseType(typeof(TriviaOption))]
        public IHttpActionResult GetTriviaOption(int id)
        {
            TriviaOption triviaOption = db.TriviaOptions.Find(id);
            if (triviaOption == null)
            {
                return NotFound();
            }

            return Ok(triviaOption);
        }

        // PUT: api/TriviaOptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTriviaOption(int id, TriviaOption triviaOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != triviaOption.QuestionId)
            {
                return BadRequest();
            }

            db.Entry(triviaOption).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TriviaOptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/TriviaOptions
        [ResponseType(typeof(TriviaOption))]
        public IHttpActionResult PostTriviaOption(TriviaOption triviaOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TriviaOptions.Add(triviaOption);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TriviaOptionExists(triviaOption.QuestionId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = triviaOption.QuestionId }, triviaOption);
        }

        // DELETE: api/TriviaOptions/5
        [ResponseType(typeof(TriviaOption))]
        public IHttpActionResult DeleteTriviaOption(int id)
        {
            TriviaOption triviaOption = db.TriviaOptions.Find(id);
            if (triviaOption == null)
            {
                return NotFound();
            }

            db.TriviaOptions.Remove(triviaOption);
            db.SaveChanges();

            return Ok(triviaOption);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TriviaOptionExists(int id)
        {
            return db.TriviaOptions.Count(e => e.QuestionId == id) > 0;
        }
    }
}