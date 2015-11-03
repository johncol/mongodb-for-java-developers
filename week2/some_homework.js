function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var tasks = ['essay', 'exam', 'test', 'homework'];
for (var i = 1; i <= 1000; i++) {
    tasks.forEach(function (task) {
        db.scores.insert({
            student_id: i,
            task: task,
            score: getRandomInt(0, 100),
        });
    });
}

db.grades.find({ 
    score: { $gte: 65 } 
}, { 
    student_id: 1, 
    score: 1, 
    _id: 0 
} ).sort({
    score: 1
})

var cursor = db.grades.find({type: 'homework'}).sort({student_id: 1, score: -1}); null;
var documentsIDs = [];
var lastStudent = {};
if (cursor.hasNext()) {
    var firstStudent = cursor.next();
    lastStudent._id = firstStudent._id;
    lastStudent.student_id = firstStudent.student_id;
}
while (cursor.hasNext()) {
    var student = cursor.next();
    if (student.student_id !== lastStudent.student_id || !cursor.hasNext()) {
        documentsIDs.push(lastStudent._id);
    }
    lastStudent._id = student._id;
    lastStudent.student_id = student.student_id;
}
documentsIDs.forEach(function (id) {
    db.grades.remove({_id: id});
});