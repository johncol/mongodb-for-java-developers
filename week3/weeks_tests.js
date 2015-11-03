

db.students.find({},{_id: false, name: true}).limit(10).sort({name: 1})
