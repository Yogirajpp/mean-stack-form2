const formModels = require('../models/formModels')
const mongoose = require('mongoose')

// get all forms
const getAllForm = async (req, res) => {
    try {
        const forms = await formModels.find({}).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get a single form
const getForm = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such form' });
        }

        const form = await formModels.findById(id);

        if (!form) {
            return res.status(404).json({ error: 'No such form' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// create new form
const createForm = async (req, res) => {
    console.log('Received Form Data:', req.body); // Log the received data
    try {
      const form = await formModels.create(req.body);
      console.log('Form created:', form);
      res.status(200).json(form);
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


// delete a form
const deleteForm = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such form' });
        }

        const form = await formModels.findOneAndDelete({ _id: id });

        if (!form) {
            return res.status(404).json({ error: 'No such form' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// update a form
const updateForm = async (req, res) => {
    const { email } = req.params;

    try {
        const form = await formModels.findOneAndUpdate({ email: email }, req.body, { new: true });

        if (!form) {
            return res.status(404).json({ error: 'No such form' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createForm,
    getAllForm,
    getForm,
    deleteForm,
    updateForm
}