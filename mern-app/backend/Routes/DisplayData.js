const express = require('express')
const router = express.Router()

router.post('/foodData',(req,res) => {
    try{
        //console.log(global.fooditems)
        res.send([global.fooditems,global.food_category])
    }catch (error){
        console.error(error.message)
        res.send("Server error")
    }
})

module.exports = router;