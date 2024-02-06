const express = require('express')
const { createForm ,getAllForm, getForm, deleteForm, updateForm } = require('../controllers/formControllers')


const router = express. Router ()

// GET all forms
router.get('/', getAllForm)

//GET a single form
router.get('/:id', getForm)

// POST a new form
router.post('/', createForm)

// DELETE a form
router.delete('/:id', deleteForm)

// UPDATE a form
router.patch('/:email', updateForm)

module.exports = router