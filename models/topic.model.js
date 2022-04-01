const db = require('../db/connection')

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics').then((result) => {
        console.log(result)
        return result.rows;
        
    });  
};
