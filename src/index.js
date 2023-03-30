import app from './app.js';
import sequelize from './database/database.js';

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(app.get('port'), () => {
      console.log('Listening on port ' + app.get('port'));
    });
  } catch (err) {
    console.log('Unable to connect to the database', err);
  }
};

main();
