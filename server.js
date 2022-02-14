const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = 7000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
