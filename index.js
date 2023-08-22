const express = require('express')
const etudiant_router = require('./routers/etudiants')
const app = express()
const port = 3000



/*app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});*/

app.use('/api/etudiant',etudiant_router);

app.listen(port, () => console.log(`Students api listening on port ${port}!`))
