const express = require(`express`);
const {PORT} = require('../config/config');
const path = require('path');
const app = express();


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'main.html'))
})
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
