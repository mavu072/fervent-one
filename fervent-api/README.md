# Fervent API

Fervent API is RESTful API that exposes endpoints for interacting with these services:
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

```commandline
pip install virtualenv
virtualenv venv
```

- Activate `venv` in Windows with:

In Powershell:
```commandline
venv\Scripts\activate
```

In CMD:
```commandline
venv\Scripts\activate.bat
```

- Activate `venv` in Mac or Linux with:

```zsh
source venv/bin/activate
```

- Deactivate `venv` with:

```commandline
deactivate
```

## Pre-installation

#### Required Software/Packages

- **Python** version 3.12.8 or higher is required

- **Tesseract OCR** is required.

    Download and install [Tesseract](https://tesseract-ocr.github.io/tessdoc/Installation.html).
    Add your installation to your PATH variables.

    To test if Tesseract is installed correctly, run:

    ```commandline
    tesseract
    ```

- **Poppler** is a package required by the python library `pdf2image`.

    Before installing the dependencies, you must install [Poppler](https://pdf2image.readthedocs.io/en/latest/installation.html).

    - **Spacy** is required.

    Download spacy and models.

    ```commandline
    pip install -U pip setuptools wheel
    pip install -U spacy
    python -m spacy download en_core_web_sm
    ```

- **OpenAI** is required.

    You will need an OpenAI API key. Create one on the [OpenAI Platform](https://platform.openai.com/).


## Installation

1. Install dependencies.

```commandline
pip install -r requirements.txt
```

2. Create environment variables.

Create an `.env file` and add the environment variables.

```env
OPENAI_API_KEY = "xxxxxxxx"
ALLOWED_ORIGIN = "*" # Add allowed origin. Hint: This should be where your frontend is running.
```

3. Run application.

```commandline
python -m uvicorn main:app
```
or
```commandline
uvicorn main:app
```

#### Hot Reloading
Hot-reloading refreshes the server when you save changes to the application files, without re-starting the server.
To enable hot-reloading, start the server with the command:

```commandline
uvicorn main:app --reload
```

#### Logging
When you run the application with uvicorn, all the logs in the console/terminal are default uvicorn logs.
These logs do not contain timestamps and information from other processes. To access more verbose logs, 
you must override uvicorn logs as follows:

```commandline
 uvicorn main:app --log-config=log_conf.yaml
```

The log configurations are defined in the `log_conf.yaml` file.

#### Deploy on your Private Network 
To deploy the application on your private or home network, use the flag:

```commandline
uvicorn main:app --host 0.0.0.0
```

Using `0.0.0.0` is the equivalent of `127.0.0.1`.

4. Test your application.

Once your application is running. Visit `http://127.0.0.1:8000/`. 
To see the API documentation. Visit `http://127.0.0.1:8000/docs#/`.


## Making your first request

Before you can query the vector database or start talking to the models.
You will need to complete a few more steps.

- Using the swagger interactive API docs or Postman:
    1. Upload files to local storage. To get you started, some files have been placed in the [samples](./sample-files/uploads) folder.
    2. Initialize the vector database. A vector store will be initialized with the files in the local storage.

Done! Now, you can start querying the database and talking to the models. 


## Unit testing

Unit tests have been configured and are runnable with `pytest`. To run unit tests, use the command:

```commandline
python -m pytest
```

#### Running a single test files

You can also run tests on a single file, by using the command:

```commandline
python -m pytest sample-tests/test_demo.py
```

You can run all tests within a module, as follows:

```commandline
python -m pytest [module_path]
```

#### Running a single unit test

You can run a single unit test, as follows:

```commandline
python -m pytest sample-tests/test_demo.py::test_func()
```

#### Printing output to console

When running tests, you may want to print output to the console. Use `-s` to allow prints to show on the console:

```commandline
python -m pytest -s
```

---