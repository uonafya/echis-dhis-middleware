const express = require('express')

 const router = express.Router()



router.get("/", (req, res)=>{
    res.send("Output List")
})

router.param("id", (req, res, next, id) =>  {
    console.log(`Hello ${id}`)
    next()
})

module.exports = router