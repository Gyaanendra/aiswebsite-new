export const data ={
  projects:[
    
    {
      id: 1,
      title: "Specialization Chatbot",
      description: "This AI-driven chatbot serves as a comprehensive guide for academic specializations, employing natural language processing to answer complex queries about course structures, prerequisite requirements, and career pathways. Integrated with university databases, it offers personalized recommendations based on student interests and academic history. Features include comparative analysis of specializations, alumni success stories, and real-time updates on curriculum changes. The system uses transformer-based models for contextual understanding and maintains conversation history for improved user experience.",
      tags: ["AI", "Chatbot", "Education"],
      contributors: ["Aviral"],
      imagePath: "/RL.png",
      githubLink: "https://github.com/yourusername/specialization-chatbot"
    },
    {
      id: 2,
      title: "Document RAG",
      description: "This sophisticated document analysis system combines retrieval-augmented generation with semantic search capabilities, enabling deep interaction with PDFs, Word documents, and research papers. The architecture integrates Llama Index for efficient document structuring and Pinecone for vector storage. Users can perform complex queries across multiple documents, receive citations, and generate summaries. Particularly valuable for legal document analysis and academic research, it maintains chat history and supports multi-file corpus analysis through a clean React-based interface.",
      tags: ["AI", "Fullstack", "RAG", "Llama Index"],
      contributors: ["Archit"],
      imagePath: "/A2.png",
      githubLink: "https://github.com/yourusername/document-rag"
    },
    {
      id: 3,
      title: "Lane Detection for Cars",
      description: "This computer vision system implements real-time lane detection using a YOLOv8 backbone combined with OpenCV's image processing pipeline. Features include curvature estimation, lane departure warnings, and adaptive region-of-interest selection. The TensorFlow-based model was trained on diverse road conditions including night driving and rainy environments. The system processes 30 FPS on embedded hardware, making it suitable for ADAS implementations. Includes a simulation module for testing detection algorithms in virtual environments.",
      tags: ["AI", "Computer Vision", "Lane Detection", "YOLO", "OpenCV", "TensorFlow"],
      contributors: ["Dhruv"],
      imagePath: "/A3.png",
      githubLink: "https://github.com/yourusername/lane-detection-cars"
    },
    {
      id: 4,
      title: "Web Sentiment Analysis",
      description: "This full-stack analytics platform performs real-time sentiment analysis on social media streams and customer reviews using fine-tuned BERT models. The dashboard visualizes emotion distributions, trend graphs, and aspect-based sentiment scores. Supports multiple languages and domain-specific lexicon integration. Features include automated report generation, alert systems for sentiment spikes, and comparative analysis between brands. The Node.js backend handles batch processing of historical data while WebSocket manages live sentiment tracking.",
      tags: ["AI", "NLP", "Sentiment Analysis", "LLM"],
      contributors: ["Samaksh", "Sukant"],
      imagePath: "/A4.png",
      githubLink: "https://github.com/yourusername/web-sentiment-analysis"
    },
    {
      id: 5,
      title: "Gesture Detection",
      description: "This vision-based control system uses MediaPipe Holistic for real-time hand tracking combined with a custom CNN for gesture classification. Implements cursor control through finger position mapping and supports 15+ predefined gestures for actions like scrolling, clicking, and zooming. Features background suppression for robust operation in varying lighting conditions. The PyTorch model achieves 98.7% accuracy on test data. Includes a training module for custom gesture creation and system preferences configuration.",
      tags: ["AI", "Computer Vision", "Deep Learning", "Automation"],
      contributors: ["Jahnavi", "Devanshi", "Kanishka"],
      imagePath: "/A5.png",
      githubLink: "https://github.com/yourusername/gesture-detection"
    },
    {
      id: 6,
      title: "CandyNLP",
      description: "This high-performance NLP library implements efficient text processing algorithms in C++17, featuring memory-mapped I/O for large corpus handling. Includes tokenizers (WordPiece, Byte-Pair), morphological analyzers, and a Porter2 stemmer. Benchmarks show 4x faster processing compared to Python equivalents. The modular architecture allows custom pipeline creation with thread-safe components. Particularly effective for preprocessing massive datasets for ML training. Comes with Python bindings for easy integration into existing ML workflows.",
      tags: ["NLP", "Machine Learning", "C++", "Tokenization", "Stemming"],
      contributors: ["Nimratpreet", "Archit"],
      imagePath: "/A6.png",
      githubLink: "https://github.com/yourusername/candy-nlp"
    },
    {
      id: 7,
      title: "ViT from Scratch",
      description: "This implementation of Vision Transformers strictly follows the original paper, featuring custom multi-head self-attention layers and patch embedding modules. Trained on ImageNet-1k, the model achieves 78.4% top-1 accuracy. Includes novel features like learned position embeddings and adaptive gradient clipping. The codebase demonstrates hybrid architectures combining CNNs with transformers. Comprehensive visualization tools show attention heatmaps and patch importance scores, making it valuable for educational and research purposes.",
      tags: ["AI", "Computer Vision", "Transformers", "ViT", "Deep Learning"],
      contributors: ["Mann"],
      imagePath: "/A7.png",
      githubLink: "https://github.com/yourusername/vit-from-scratch"
    },
    {
      id: 8,
      title: "Python-Profanity-Filter",
      description: "This context-aware filtering system uses ensemble methods combining word embeddings, phonetic matching, and n-gram analysis. Features include adjustable sensitivity levels, custom blocklist/allowlist support, and leet-speak detection. The pipeline handles spelling variations and partial word masking. Integrated with SpaCy for linguistic features extraction. Achieves 99.1% recall on the HateBERT benchmark dataset. Offers both API endpoints for real-time filtering and batch processing modes for content moderation at scale.",
      tags: ["AI", "NLP", "Profanity Detection", "Python"],
      contributors: ["Anvesh"],
      imagePath: "/A8.png",
      githubLink: "https://github.com/mr-anvesh/ML_Profanity_Detector"
    }
  ]
}