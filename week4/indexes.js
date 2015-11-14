

use blog;
db.posts.createIndex({date:-1})
db.posts.getIndexes()

db.posts.explain('executionStats').find().sort({date: 1}).limit(1)
db.posts.find().sort({date: 1}).limit(1)

db.posts.createIndex({permalink: 1})

db.posts.find({},{tags:1}).limit(1)

db.posts.createIndex({tags: 1, date: -1})

db.system.profile.find().sort({ts:-1}).limit(1)

db.profiles.find().sort({ts:-1}).limit(1)