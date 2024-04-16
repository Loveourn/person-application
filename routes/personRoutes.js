const express = require('express');
const router = express.Router();
const Person  = require('../models/person')



router.get('/',async(req,res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'});
    }
   
});


router.post('/', async (req, res) => {
    try {
      const newPersonData = req.body;
      const newPerson = new Person(newPersonData);
      // Save the new person to the database using await
      const savedPerson = await newPerson.save();
      console.log('Saved person to database');
      res.status(201).json(savedPerson);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
router.put("/:id",async(req,res) => {
      try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const updatedPerson = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
      });
          if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found'
      });
    }
    // Send the updated person data as a JSON response
    res.json(updatedPerson);
} catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

router.delete('/:id',async(req,res) => {
    try {
        const personId = req.params.id;
        const deletedPerson = await Person.findByIdAndDelete(personId);
        if(!deletedPerson){
            return res.status(404).json({ error: 'Person not found'
            }),
            res.json({
                message:'person deleted succesfully'
            })
            
            }
        } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
})

module.exports = router;