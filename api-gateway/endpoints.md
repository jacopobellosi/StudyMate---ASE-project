# API Gateway Endpoints

## Audio Transcription API Endpoints

### GET `/api/v1/transcription/`

#### Description
Returns a simple page to verify service is working.


### GET `/api/v1/transcription/docs`

#### Description
Fetches the swagger UI page with information on all endpoints of the `voice-transcription` microservice.


### POST `/api/v1/transcription/transcribe`

#### Description
Transcribes an audio file (uploaded as a multipart)

#### Request
- **Method:** POST
- **URL:** `/api/v1/transcription/transcribe`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    - `file`: The audio file to be transcribed, uploaded as a multipart/form-data.
    - Example using `curl`:
        ```sh
        curl -X POST "http://url/api/v1/transcription/transcribe" \
        -F "file=@path/to/your/audiofile.wav"
        ```

### Response
- **Status Code:** 200
- **Body:**
    ```json
    {
        "res": "transcribed text"
    }
    ```

