-- Fill this out after we have some data and can make sure everything works
set identity_insert [Categorization] on
insert into [Categorization] ([Id], [Type]) VALUES (1, 'Alphabetical'), (2, 'Part of Speech')
set identity_insert [Categorization] off
