const express = require ('express');
const router = express.Router();

const data = ["rick", "sara", "bob"]

function getPerson(name) {
    
    const returnValue =  data.find(names => name === names)
    if(returnValue){
        return Promise.resolve(returnValue)
    } else {
        return Promise.reject("this sucks")
        
    }
}


router.get('/:name', async (req, res) => {
    // try {
    //     res.json(await getPerson(req.params.name))
        
    // } catch (error) {
    //     console.log(error);
    // }
     getPerson(req.params.name)
    .then(name => res.json(name))
    .catch(err => console.log(err))
})

module.exports = router;