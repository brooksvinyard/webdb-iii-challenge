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

// localhost:4444/api/cohorts/:id
// PUT update a cohort
router.put('/:id', (req, res) => {
    db('cohorts')
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

// localhost:4444/api/cohorts/:id
// DELETE 
router.delete('/:id', (req, res) => {
    db('cohorts')
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