require('dotenv').config();

exports.classify = async (inputText) => {


    if (!process.env.HF_API_TOKEN) {
        console.error("Missing HF_API_TOKEN");
        return fallbackResult("Configuration Error");
    }
    const MODEL_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli";

    try {
        
        
        const response = await fetch(MODEL_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HF_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: inputText,
                parameters: {
                    candidate_labels: ["Complaint", "Query", "Feedback", "Other"]
                }
            })
        });

        const rawData = await response.json();
        
        
        
        if (!response.ok) {
            console.error("API Error:", rawData);
            return fallbackResult("API Error", inputText);
        }

        

        
        let topCategory = "Other";
        let topConfidence = 0.0;

       
        
        if (Array.isArray(rawData) && rawData.length > 0 && rawData[0].label) {
   
            
            topCategory = rawData[0].label;
            topConfidence = rawData[0].score;
        } 
       
        
        else if (rawData.labels && Array.isArray(rawData.labels)) {
            topCategory = rawData.labels[0];
            topConfidence = rawData.scores[0];
        } 
     
        
        else if (Array.isArray(rawData) && rawData[0].labels) {
            topCategory = rawData[0].labels[0];
            topConfidence = rawData[0].scores[0];
        }

        else {
             console.warn("Unknown JSON structure:", JSON.stringify(rawData));
             return fallbackResult("Parsing Error", inputText);
        }

    
        
        return {
            category: topCategory,
            confidence: parseFloat(topConfidence.toFixed(2)),
            metadata: "Powered by Hugging Face"
        };
        

    } catch (error) {
        console.error("AI Service Error:", error.message);
        return ("Error: " + error.message, inputText);
    }
};

