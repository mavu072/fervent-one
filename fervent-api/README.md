# FastAPI Starter

Quickly get started with [FastAPI](https://fastapi.tiangolo.com/) using this starter!

- If you want to upgrade Python, you can change the image in the [Dockerfile](./.codesandbox/Dockerfile).
- Modify [requirements.txt](./requirements.txt) to add packages.

# Setup environment

1. Install dependencies.

```zsh
pip install -r requirements.txt
```

2. Create envinronment variables.
   Create an `.env file` and add the environment variables.

```env
OPENAI_API_KEY = "xxxxxxxx"
CHROMA_DIR = "__chroma__"
DOCUMENT_DIR = "__local__"
```

3. Run application.

```zsh
python -m uvicorn main:app --reload
```

or

```zsh
uvicorn main:app --reload
```

4. Test your application
   Once your application is running. Visit `http://127.0.0.1:8000/`. To see the API documentation. Visit `http://127.0.0.1:8000/docs#/`.
