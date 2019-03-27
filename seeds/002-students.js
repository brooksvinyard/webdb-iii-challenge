
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Frodo', cohort_id: 1},
        { name: 'Samwise', cohort_id: 1},
        { name: 'Gimli', cohort_id: 2},
        { name: 'Aragon', cohort_id: 3},
      ]);
    });
};
