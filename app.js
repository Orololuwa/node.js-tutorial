const fs = require('fs');
const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();
app.use(express.json());

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    tours,
  });
});

app.post('/api/v1/tours', (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = {
    id,
    ...req.body,
  };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        tour: newTour,
      });
    }
  );
});

const port = 7000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
