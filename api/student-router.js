const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  },
  debug: true
}

const db = knex(knexConfig);

// localhost:4444/api/students
// GET all students
router.get('/', (req, res) => {
    db('students')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json(error);
    }); 
});

// localhost:4444/api/students/:id
// SELECT students.name, students.id, cohorts.name as CohortName
// FROM students
// LEFT JOIN cohorts 
// ON students.cohort_id = cohorts.id 
// WHERE students.id

router.get('/:id', (req, res) => {
    const id  = req.params.id;

    db('students')
    .select('students.name', 'students.id', 'cohorts.name as cohort')
    .where('students.id', id)
    .first()
    .leftJoin('cohorts', 'students.cohort_id', 'cohorts.id')
    .then(student => {
      res.status(200).json(student);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


// localhost:4444/api/students/
// POST a new student
router.post('/', (req, res) => {
    db('students')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db('students')
      .where({ id })
      .first()
      .then(student => {
       res.status(201).json(student);
      })
      .catch(error => {
        res.status(500).json(error);
      });
      
    })
});

// localhost:4444/api/students/:id
// PUT update a student
router.put('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if(count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// localhost:4444/api/students/:id
// DELETE 
router.delete('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


module.exports = router;