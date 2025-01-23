function Docu() {
  return <div>
    <h1>Welcome to CondenseAI Documentation</h1>
    <h3>Overview</h3>
    <p>CondenseAI is an innovative platform designed to simplify and streamline text summarization and paraphrasing. Users can upload text, images, or audio files to be efficiently summarized or paraphrased, leveraging advanced AI capabilities. Whether you're a student, professional, or casual user, CondenseAI provides an intuitive interface and robust backend to deliver seamless results.
    </p>

    <h3>Features</h3>

    <ul>
      <li>Text Summarization: Upload text files and get concise, meaningful summaries tailored to your needs.</li>
      <li>Paraphrasing Tool: Reword your text effectively while retaining its original meaning.</li>
      <li>Audio Transcription: Convert audio files to text, which can then be summarized or paraphrased.</li>
      <li>Image Text Extraction: Extract text from images (e.g., scanned documents) for summarization or paraphrasing.</li>
      <li>User Management: Secure account creation and login for a personalized experience.</li>
    </ul>



    <h3>Technical Architecture</h3>

    <ul>
      <li>Frontend: Developed in React, the user interface is modern, responsive, and easy to navigate.</li>
      <li>Backend: Built with Python using FastAPI (or Flask), ensuring robust and high-performance API services.</li>
      <li>Microservices: The application follows a microservices architecture, with dedicated services for summarization, paraphrasing, voice transcription, character recognition, and user management.</li>
    </ul>

    <h3>Project Structure</h3>

    <ul>
      <li>AI Service: Handles the core summarization and paraphrasing logic using state-of-the-art natural language processing models.</li>
      <li>Voice Transcription: Uses Vosk for audio-to-text conversion, supplemented by utilities like ffmpeg for audio preprocessing.</li>
      <li>Character Recognition: Extracts text from uploaded images via the extractor.py module.</li>
      <li>Paraphrasing Tool: Coordinates the paraphrasing workflow with configurable settings.</li>
      <li>User Management: Manages user authentication, registration, and roles.</li>

    </ul>


    <h3>How It Works</h3>

    <ol>
      <li>Upload Content: Start by uploading a text file, audio, or image.</li>
      <li>Process: The system routes the file to the appropriate microservice for processing (e.g., transcription, recognition).</li>
      <li>Output: Choose between summarization or paraphrasing, and CondenseAI delivers the processed content in seconds.</li>
    </ol>

    <h3>Why Choose CondenseAI?</h3>

    <ul>
      <li>Advanced AI models ensure high-quality results.</li>
      <li>Multi-format support (text, audio, images).</li>
      <li>User-friendly interface tailored for efficiency.</li>
      <li>Secure and scalable infrastructure.</li>
    </ul>

    
    <strong>For further inquiries or technical support, feel free to contact our team.</strong>
  </div >;
}

export default Docu;
