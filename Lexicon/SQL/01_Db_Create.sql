-- Create Lexicon's Database Tables
USE [master]

IF db_id('Lexicon') IS NULl
  CREATE DATABASE [Lexicon]
GO

USE [Lexicon]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Categorization];
DROP TABLE IF EXISTS [Collection];
DROP TABLE IF EXISTS [ProjectCollection];
DROP TABLE IF EXISTS [Word];
GO

CREATE TABLE [User] (
	[Id] integer PRIMARY KEY IDENTITY,
	[FirebaseUserId] NVARCHAR(28) NOT NULL,
	[Email] nvarchar(555) NOT NULL,

	CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
	CONSTRAINT UQ_Email UNIQUE(Email)
)

CREATE TABLE [Project] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[CreationDate] datetime NOT NULL,
	[Name] nvarchar(255) NOT NULL

	CONSTRAINT [FK_Project_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)

CREATE TABLE [Collection] (
	


)

CREATE TABLE [Categorization] (
	[Id] integer PRIMARY KEY IDENTITY,
	[CategorizationType] varchar(255) NOT NULL
)

CREATE TABLE [ProjectCollection] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ProjectId] integer NOT NULL,
	[CollectionId] integer NOT NULL


)

CREATE TABLE [Word] (

)
GO

	

-- BELOW IS FROM TABLOID
CREATE TABLE [Post] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [PublishDateTime] datetime,
  [IsApproved] bit NOT NULL,
  [CategoryId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Post_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Post_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Subject] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [CreateDateTime] datetime NOT NULL,

  CONSTRAINT [FK_Comment_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Tag] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [PostTag] (
  [id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULL,
  [TagId] integer NOT NULL,
  
  CONSTRAINT [FK_PostTag_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_PostTag_Tag] FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
)