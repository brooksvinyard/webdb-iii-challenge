const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  },
//   debug: true
}

const db = knex(knexConfig);

// localhost:4444/api/cohorts
// GET all cohorts
router.get('/', (req, res) => {
    db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error);
    }); 
});

// localhost:4444/api/cohorts/:id
// GET by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cohorts')
    .where({ id })
    .first()
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// localhost:4444/api/cohorts/
// POST a new cohort
router.post('/', (req, res) => {
    db('cohorts')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db('cohorts')
      .where({ id })
      .first()
      .then(cohort => {
       res.status(201).json(cohort);
      })
      .catch(error => {
        res.status(500).json(error);
      });
      
    })
});



module.exports = router;