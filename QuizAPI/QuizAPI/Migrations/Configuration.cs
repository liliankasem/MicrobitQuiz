namespace QuizAPI.Migrations
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<QuizAPI.Models.QuizAPIContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(QuizAPI.Models.QuizAPIContext context)
        {

            var questions = new List<TriviaQuestion>();

            questions.Add(new TriviaQuestion
            {
                QuizName = "snowflake",
                Title = "What is the code for a forever loop?",
                Options = (new TriviaOption[]
                 {
                    new TriviaOption { Title= "basic -> do forever", IsCorrect= true },
                    new TriviaOption { Title= "basic -> forever", IsCorrect= false },
                    new TriviaOption { Title= "forever", IsCorrect= false },
                    new TriviaOption { Title= "do forever", IsCorrect= false }
                 }).ToList()
            });

            questions.Add(new TriviaQuestion
            {
                QuizName = "snowflake",
                Title = "What does the 400 mean in 'show animation'?",
                Options = (new TriviaOption[]
                 {
                    new TriviaOption { Title= "It's the number of flashes", IsCorrect= false },
                    new TriviaOption { Title= "It's the size of the picture", IsCorrect= false },
                    new TriviaOption { Title= "It's the number of pixels", IsCorrect= false },
                    new TriviaOption { Title= "It's the interval delay", IsCorrect= true }
                 }).ToList()
            });

            questions.Add(new TriviaQuestion
            {
                QuizName = "snowflake",
                Title = "In reference to an animation, what is an 'interval'?",
                Options = (new TriviaOption[]
                 {
                    new TriviaOption { Title= "The number of seconds to pause after each image frame", IsCorrect= false },
                    new TriviaOption { Title= "The number of the image blinks", IsCorrect= false },
                    new TriviaOption { Title= "The number of milliseconds to pause after each image frame", IsCorrect= true },
                    new TriviaOption { Title= "The number of images in your animation", IsCorrect= false }
                 }).ToList()
            });

            questions.Add(new TriviaQuestion
            {
                QuizName = "snowflake",
                Title = "Which is the correct code to change the interval from 400 to 800?",
                Options = (new TriviaOption[]
                 {
                    new TriviaOption { Title= "basic -> show animation(, 800)", IsCorrect= true },
                    new TriviaOption { Title= "basic -> animation 800", IsCorrect= false },
                    new TriviaOption { Title= "basic -> animation 800", IsCorrect= false },
                    new TriviaOption { Title= "basic -> animation(, 800)", IsCorrect= false }
                }).ToList()
            });

            questions.Add(new TriviaQuestion
            {
                QuizName = "snowflake",
                Title = "What is the code to allow an animation to never stop displaying?",
                Options = (new TriviaOption[]
                 {
                    new TriviaOption { Title= "forever do basic -> show animation(, 400) end", IsCorrect= false },
                    new TriviaOption { Title= "basic -> forever show animation(, 400) end", IsCorrect= false },
                    new TriviaOption { Title= "basic -> forever do basic -> show animation(, 400) end", IsCorrect= true },
                    new TriviaOption { Title= "basic -> forever do basic -> show animation(400)", IsCorrect= false }
                 }).ToList()
            });

            questions.ForEach(a => context.TriviaQuestions.Add(a));

            context.SaveChanges();

        }
    }
}
