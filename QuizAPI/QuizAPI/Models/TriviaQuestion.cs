﻿namespace QuizAPI.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class TriviaQuestion
    {
        public int Id { get; set; }

        public string QuizName { get; set; }

        [Required]
        public string Title { get; set; }

        public virtual List<TriviaOption> Options { get; set; }
    }
}