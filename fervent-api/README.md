# Fervent API

Fervent API is REST service that exposes endpoints for interacting with these services:
- inferencing language models (LLMs) to generate responses, 
- retrieval augmented generation (RAG) to generate responses informed by documents, 
- optical character recognition (OCR) to read PDF files and,
- named entity recognition (NER) to identify personally identifying information within queries.

These services are consumed through the API by client applications.

## Setup environment

#### Best Practices

In Python, it is best practices to install dependencies in a virtual environment to avoid
changing system state.

To set up a virtual env, do the following:

- Install `virtualenv` and create `venv` directory:

```zsh
pip install virtualenv
virtualenv venv
```

- Activate `venv` in Windows with:

```powershell
venv\Scripts\activate
```

- Activate `venv` in Mac or Linux with:

```
source venv/bin/activate
```

- Deactivate `venv` with:

```
deactivate
```

## Pre-installation

#### Required Packages

- **Tesseract OCR** is required.

Download and install [Tesseract](https://tesseract-ocr.github.io/tessdoc/Installation.html).
Add your installation to your PATH variables.

To test if Tesseract is installed correctly, run:
```zsh
tesseract
```

- **Poppler** is a package required by the python library `pdf2image`.

Before installing the dependencies, you must install [Poppler](https://pdf2image.readthedocs.io/en/latest/installation.html).

- **Spacy** is required.

Download spacy and models.
```zsh
pip install -U pip setuptools wheel
pip install -U spacy
python -m spacy download en_core_web_sm
```

- **OpenAI** is required.

You will need an OpenAI API key. Create one on the [OpenAI Platform](https://platform.openai.com/).

## Installation

1. Install dependencies.

```zsh
pip install -r requirements.txt
```

2. Create environment variables.

Create an `.env file` and add the environment variables.

```env
OPENAI_API_KEY = "xxxxxxxx"
CHROMA_DIR = "__chroma__"
DOCUMENT_DIR = "__local__"
ALLOWED_ORIGIN = "*" # Insecure: Allows all origins, not for production
```

3. Run application.

```zsh
python -m uvicorn main:app --reload
```
or
```zsh
uvicorn main:app --reload
```

To make the application available on your local network, use:
```
--host 0.0.0.0 # Your IP Address
```
Default: '127.0.0.1'.

4. Test your application.

Once your application is running. Visit `http://127.0.0.1:8000/`. To see the API documentation. Visit `http://127.0.0.1:8000/docs#/`.

---