
exports.up = function(knex) {
    return knex.schema.createTable('cohorts', function(tbl) {
        // primary key, called id and make it auto-increment
        tbl.increments();
  
        // Setup a column called 'name' max length of 128: It is required and unique 
        tbl.string('name', 128).notNullable().unique();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cohorts');
};
