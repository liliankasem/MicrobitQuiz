using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace QuizAPI.Models
{
    public class QuizAPIContext : DbContext
    {
    
        public QuizAPIContext() : base("name=QuizAPIContext")
        {
        }

        public System.Data.Entity.DbSet<QuizAPI.Models.TriviaQuestion> TriviaQuestions { get; set; }

        public System.Data.Entity.DbSet<QuizAPI.Models.TriviaOption> TriviaOptions { get; set; }
    }
}
