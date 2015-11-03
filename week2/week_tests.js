db.people.find(name: {$gte: 'F', $lte: 'Q'});

db.users.find({
    name: {
        $regex: 'q'
    },
    email: {
        $exists: true
    }
});

db.scores.find({
    $or: [{
        score: {
            $lt: 50
        }
    }, {
        score: {
            $gt: 90
        }
    }]
})

db.people.insert({
    name: 'George',
    favorites: ['fruits','pretzels']
})
db.people.insert({
    name: 'Howard',
    favorites: ['pretzels','beer']
})
db.people.insert({
    name: 'Lilian',
    favorites: ['pretzels','beer', 'fruits','bread']
})
db.people.insert({
    name: 'Morrigan',
    favorites: ['beer', 'fruits','bread','coke','milk']
})

db.people.find({ favorites: 'pretzels' })
db.people.find({ favorites: { $regex: 'pret' } })
db.people.find({ favorites: { $all: ['pretzels','beer'] } })

db.people.find({ name: {$in: ['John', 'Lilian']}})
db.people.find({ favorites: {$in: ['bread', 'coke']}})

db.catalog.find({ price: { $gt: 10000 }, reviews.rating: { $gte: 5 } })

var cursor = db.people.find(); null;
cursor.hasNext()
cursor.next()
cursor.limit(3)
cursor.sort({ name: 1 })
cursor.sort({ name: -1 })

cursor.count({ type: 'exam' })
db.scores.count({ type: 'exam' })

db.scores.count({ type: 'essay', score: { $gt: 90 } })

db.people.update({ name: 'John' }, {
    name: 'John',
    age: 26,
    email: 'john.cely@prodigious.com'
})

db.people.update({ name: 'John' }, {
    $set: {
        email: 'jacelys@unal.edu.co'
    }
})

db.people.update({ name: 'John' }, {
    $inc: {
        age: 3
    }
})

db.users.update({
    _id: 'myrnarackham'
}, {
    $set: {
        country: 'RU'
    }
})

db.users.update({
    _id: 'jimmy'
}, {
    $unset: {
        interests: 1
    }
})

db.arrays.insert({_id: 0, data: [1,2,3,4,5]})
db.arrays.update({_id: 0}, {$set: { 'data.2': 10}})
db.arrays.update({_id: 0}, {$push: { 'data': 6}})
db.arrays.update({_id: 0}, {$pop: { 'data': 1}})
db.arrays.update({_id: 0}, {$pop: { 'data': -1}})
db.arrays.update({_id: 0}, {$pushAll: { 'data': [5,6,7,8,9]}})
db.arrays.update({_id: 0}, {$pull: { 'data': 5}})
db.arrays.update({_id: 0}, {$pullAll: { 'data': [6,7,8]}})
db.arrays.update({_id: 0}, {$addToSet: { 'data': 6}})

db.people.update({ name: 'Nataly'}, $set: { age: 22 }, { upsert: true })

db.people.update({ }, {$set: { title: 'Dr.' }}, {multi: true})

db.scores.update({
    score: {
        $lt: 70
    }
}, {
    $inc: {
        score: 20
    }
}, {
    multi: true
})

db.people.remove({ name: 'Nataly' })

db.people.drop()

db.scores.remove({score: { $lt: 60 }})

