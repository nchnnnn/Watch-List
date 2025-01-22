const express = require('express');
const app = express();

app.use(express.static('public')); 
app.get('/', (req, res) =>{
    res.sendFile('/public/index.html')
})

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}/`);
})