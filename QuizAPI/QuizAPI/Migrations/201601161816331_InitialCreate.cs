namespace QuizAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TriviaOptions",
                c => new
                    {
                        QuestionId = c.Int(nullable: false),
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        IsCorrect = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.QuestionId, t.Id })
                .ForeignKey("dbo.TriviaQuestions", t => t.QuestionId, cascadeDelete: true)
                .Index(t => t.QuestionId);
            
            CreateTable(
                "dbo.TriviaQuestions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuizName = c.String(),
                        Title = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TriviaOptions", "QuestionId", "dbo.TriviaQuestions");
            DropIndex("dbo.TriviaOptions", new[] { "QuestionId" });
            DropTable("dbo.TriviaQuestions");
            DropTable("dbo.TriviaOptions");
        }
    }
}
