-- Create Lexicon's Database Tables
USE [master]

IF db_id('Lexicon') IS NULl
  CREATE DATABASE [Lexicon]
GO

USE [Lexicon]
GO

DROP TABLE IF EXISTS [Word];
DROP TABLE IF EXISTS [ProjectCollection];
DROP TABLE IF EXISTS [Collection];
DROP TABLE IF EXISTS [Categorization];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [User];
GO

CREATE TABLE [User] (
	[Id] integer PRIMARY KEY IDENTITY,
	[FirebaseUserId] NVARCHAR(28) NOT NULL,
	[Email] nvarchar(255) NOT NULL,

	CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
	CONSTRAINT UQ_Email UNIQUE(Email)
)

CREATE TABLE [Project] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[CreationDate] datetime NOT NULL,
	[Name] nvarchar(255) NOT NULL

	CONSTRAINT UQ_ProjectName UNIQUE([Name]),
	CONSTRAINT [FK_Project_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)

CREATE TABLE [Categorization] (
	[Id] integer PRIMARY KEY IDENTITY,
	[CategorizationType] varchar(255) NOT NULL
)

CREATE TABLE [Collection] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[CategorizationId] integer NOT NULL,
	[CreationDate] datetime NOT NULL,
	[Name] nvarchar(255) NOT NULL,
	[Description] nvarchar(255) NOT NULL,
	[Pinned] bit NOT NULL

	CONSTRAINT UQ_CollectionName UNIQUE([Name]),
	CONSTRAINT [FK_Collection_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
	CONSTRAINT [FK_Collection_Categorization] FOREIGN KEY ([CategorizationId]) REFERENCES [Categorization] ([Id])
)

CREATE TABLE [ProjectCollection] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ProjectId] integer NOT NULL,
	[CollectionId] integer NOT NULL

	CONSTRAINT [FK_ProjectCollection_Project] FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id]),
	CONSTRAINT [FK_ProjectCollection_Collection] FOREIGN KEY ([CollectionId]) REFERENCES [Collection] ([Id])
)

CREATE TABLE [Word] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[CollectionId] integer NOT NULL,
	[MwWordId] integer NOT NULL,
	[Word] varchar(255) NOT NULL,
	[LastViewed] datetime NOT NULL

	CONSTRAINT [FK_Word_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
	CONSTRAINT [FK_Word_Collection] FOREIGN KEY ([CollectionId]) REFERENCES [Collection] ([Id])
)
GO