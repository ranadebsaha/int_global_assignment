const aiService = require('../services/service');


exports.classifyText = async (req, res) => {


    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Invalid input. Please provide a "text" string.' });
        }
        const result = await aiService.classify(text);
        return res.status(200).json(result);


    } catch (error) {
        console.error('Controller Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};