// 1:
{
    "_id" : ObjectId("56476dce68755b424b3c6676"),
    "body" : "empty_post",
    "permalink" : "cxzdzjkztkqraoqlgcru",
    "author" : "machine",
    "title" : "US Constitution",
    "tags" : [
        "bike",
        "cheetah"
    ],
    "comments" : [
        {
            "body" : "empty_comment",
            "email" : "eAYtQPfz@kVZCJnev.com",
            "author" : "Kayce Kenyon"
        },
        {
            "body" : "empty_comment",
            "email" : "zvJVXNyM@iYZmmOtM.com",
            "author" : "Quincy Danaher"
        }
    ]
}

db.posts.aggregate([
    { $unwind: '$comments' }, 
    { $group: { _id: '$comments.author', num_of_comments: { $sum: 1 } } }, 
    { $sort: { num_of_comments: -1 } }, 
    { $project: { _id: 0, author: '$_id', num_of_comments: 1 } },
    { $limit: 5 }
]);


// 2:

{
    "_id" : "92278",
    "city" : "TWENTYNINE PALMS",
    "state" : "CA",
    "pop" : 11412,
    "loc" : [
        -116.06041,
        34.237969
    ]
}

db.zips.aggregate([
    { $match: { state: { $in: ['CA', 'NY'] }, pop: { $gt: 25000 } } }, 
    { $group: { _id: null, total: { $avg: '$pop' } } }
]);

// 3:

{
    "_id" : ObjectId("50b59cd75bed76f46522c392"),
    "student_id" : 10,
    "class_id" : 5,
    "scores" : [
        {
            "type" : "exam",
            "score" : 69.17634380939022
        },
        {
            "type" : "quiz",
            "score" : 61.20182926719762
        }
    ]
}

db.grades.aggregate([{ $unwind: '$scores' }, 
    { $match: { 'scores.type': { $in: ['exam', 'homework'] } } }, 
    { $group: { _id: {student_id: '$student_id', class_id: '$class_id'}, avg_score: { $avg: '$scores.score' } } },
    { $group: { _id: '$_id.class_id', avg_score: { $avg: '$avg_score' } } },
    { $project: { _id: 0, class_id: '$_id', avg_score: 1 } }, 
    { $sort: { avg_score: -1 } }, 
    { $limit: 5 }
]);

//4:

{
    "_id" : "92278",
    "city" : "TWENTYNINE PALMS",
    "state" : "CA",
    "pop" : 11412,
    "loc" : [
        -116.06041,
        34.237969
    ]
}

db.zips.aggregate([
    { $project: { pop: 1, initial_char: { $substr: ['$city', 0, 1] } } },
    { $match: { initial_char: { $in: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] } } },
    { $group: { _id: null, total: { $sum: '$pop' } } }
]);

