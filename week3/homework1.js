

use school

var type = 'homework';

var students = db.students.find({
    'scores.type': type
}); null;

var updatedStudents = [];
while (students.hasNext())  {
    var student = students.next();
    var scores = student.scores;
    if (scores) {
        var minScore = {};
        for (var i = 0; i < scores.length; i++) {
            if (scores[i].type === type && (minScore.index === undefined || scores[i].score < minScore.score)) {
                minScore = {
                    index: i,
                    score: scores[i].score
                };
            }
        }
        student.scores.splice(minScore.index, 1);
        updatedStudents.push(student);
    }
}

updatedStudents.forEach(function (student) {
    db.students.update({ _id: student._id }, {
        $set: { scores: student.scores }
    });
});