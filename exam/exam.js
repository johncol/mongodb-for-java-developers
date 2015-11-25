// 1

db.messages.findOne();

db.messages.aggregate([{
    $match: {
        'headers.From': /^andrew.fastow@enron.com$/i,
        'headers.To': /^jeff.skilling@enron.com$/i
    }
}, {
    $group: {
        _id: null,
        count: { $sum: 1 }
    }
}]);

db.messages.find({
    'headers.From': /^andrew.fastow@enron.com$/i,
    'headers.To': /^jeff.skilling@enron.com$/i
}).length()

// 2

db.messages.aggregate([{
    $project: {
        from: '$headers.From',
        to: '$headers.To'
    }
}, {
    $unwind: '$to'
}, {
    $group: {
        _id: { id: '$_id', from: '$from' },
        to: { $addToSet: '$to' }
    }
}, {
    $project: {
        _id: 0,
        from: '$_id.from',
        to: '$to'
    }
}, {
    $unwind: '$to'
}, {
    $group: {
        _id: { from: '$from', to: '$to' },
        count: { $sum: 1 }
    }
}, {
    $sort: { count: -1 }
},
{ $limit: 5 }])

db.tests.insert({
    _id: 1,
    o: { a: [1, 2, 3] }
})
db.tests.aggregate([{ $unwind: '$o.a' }])

// 3

db.messages.find({ 'headers.To': 'mrpotatohead@10gen.com' }).count()

db.messages.find({ 'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>' }).count()

db.messages.update({ 
    'headers.Message-ID': '<8147308.1075851042335.JavaMail.evans@thyme>'
}, {
    $addToSet: { 'headers.To': 'mrpotatohead@10gen.com' }
})

// 4

db.posts.aggregate([
    { $project: { permalink: 1 } }, 
    { $limit: 3 }
])

// 5

var id = 0;
for (var a = 0; a < 10; a++) {
    for (var b = 0; b < 10; b++) {
        for (var c = 0; c < 10; c++) {
            db.tests5.insert({ _id: ++id, a: a, b: b, c: c });
        }
    }
}

db.tests5.createIndex({_id: 1})
db.tests5.createIndex({a: 1, b: 1})
db.tests5.createIndex({a: 1, c: 1})
db.tests5.createIndex({c: 1})
db.tests5.createIndex({a: 1, b: 1, c: -1})

db.tests5.getIndexes()

db.tests5.explain().find({'a':{'$lt':10000}, 'b':{'$gt': 5000}}, {'a':1, 'c':1}).sort({'c':-1})

// 7

mongoimport --db gallery --collection albums --file albums.json
1000
mongoimport --db gallery --collection images --file images.json
100000

db.images.createIndex({_id: 1});
db.albums.createIndex({images:1});
db.images.count({tags:'sunrises'}); //49887

var ids = [];
var cursor = db.albums.find(); null;
while(cursor.hasNext()) {
    var images = cursor.next().images;
    images.forEach(function (image) {
        ids.push(image);
    });
}

ids.length

var cursor = db.images.find(); null;
var toDelete = [];
while(cursor.hasNext()) {
    var image = cursor.next()
    if (ids.indexOf(image._id) === -1) {
        toDelete.push(image._id);
    }
}

toDelete.length


// 100000 - 10263 = 89737

toDelete.forEach(function (id) {
    db.images.remove({_id: id});
});

db.images.count(); 
db.images.count({tags:'sunrises'});  //44787

// 10


