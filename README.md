# AI-Assisted Text Classification API

## Project Overview
This is a backend microservice built with **Node.js** and **Express.js**. It classifies customer input text into categories (Complaint, Query, Feedback, Other) using the **Hugging Face Inference API**.

## Tech Stack
* [cite_start]**Framework:** Node.js (Express.js) [cite: 12]
* **AI Provider:** Hugging Face (Zero-Shot Classification)
* [cite_start]**Architecture:** Controller-Service Pattern [cite: 13]

## Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone <YOUR_GITHUB_REPO_LINK_HERE>
    cd int-text-classifier
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root folder:
    ```env
    PORT=3000
    HF_API_TOKEN=hf_your_token_here
    ```
    *(Note: The token requires "Inference" permissions)*

4.  **Run the Server**
    ```bash
    node src/app.js
    ```

## API Usage

[cite_start]**Endpoint:** `POST /api/classify` [cite: 7]

**Request Body:**
```json
{
  "text": "The login page keeps giving me a 500 error."
}

Response:
{
  "category": "Complaint",
  "confidence": 0.92,
  "metadata": "Powered by Hugging Face"
}

How AI Was Used

I utilized the Hugging Face Inference API with the facebook/bart-large-mnli model. This model utilizes Zero-Shot Classification, which allows the API to categorize text into the required labels (Complaint, Query, Feedback, Other) without needing custom training data. The service sends the user text and these candidate labels to the model, which returns the most probable category and a confidence score.


---
