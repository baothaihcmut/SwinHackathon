# Project Title

## Overview

This project consists of three main components:
- A React frontend located in the `Web` directory
- A Node.js backend with OAuth2 authentication
- A FastAPI backend located in the `API` directory

## Directory Structure


## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version x.x.x)
- Python (version x.x.x)
- Pip (Python package installer)
- Docker (optional, for containerized setup)

### Setting Up the React App

1. Navigate to the `Web` directory:
    ```bash
    cd Web
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

The app will run on `http://localhost:3000`.

### Setting Up the Node.js App (OAuth2)

1. Navigate to the `NodeApp` directory:
    ```bash
    cd NodeApp
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the Node.js server:
    ```bash
    npm start
    ```

The server will run on `http://localhost:5000`.

### Setting Up the FastAPI App

1. Navigate to the `API` directory:
    ```bash
    cd API
    ```

2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Start the FastAPI app:
    ```bash
    uvicorn main:app --reload
    ```

The app will run on `http://localhost:8000`.

## API Endpoints

- **Node.js OAuth2 App**:
  - Authentication endpoints and resources will be defined here.

- **FastAPI App**:
  - API endpoints can be accessed through `http://localhost:8000/docs` for Swagger UI.

## Contributing

Feel free to fork this project, create branches for new features, and submit pull requests.

## License

This project is licensed under the MIT License.
