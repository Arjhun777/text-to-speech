import React, { useState, useEffect } from 'react';
import { getVoices, textToVoice } from '../../services/voice.service';
import { VoiceResponse } from '../../types/types';
import loaderGif from "../../assets/gear-spinner.svg";
import "./TextToVoice.css";

const TextToVoice = () => {
  const [inputText, setInputText] = useState('');
  const [voices, setVoices] = useState<Array<any>>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Fetch voices from the backend
    fetchVoices();
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  const fetchVoices = async () => {
    try {
      setLoader(true);
      const response: VoiceResponse = await getVoices(); // Using async/await
      if (response.data?.voices?.length) {
        const voices = response.data.voices.map((voice) => ({
          name: voice.name,
          voiceId: voice.voice_id 
        }));
        setSelectedVoice(voices[0].voiceId);
        setVoices(voices);
      } else {
        console.log("No voices found");
      }
      setFailed(false);
    } catch (error) {
      console.log('Error fetching voices:', error);
      setFailed(true);
    } finally {
      setLoader(false);
    }
  }

  const handleTextToSpeech = async () => {
    if (!inputText || !selectedVoice) return;
    setAudioUrl("");
    setLoader(true);
    try {
      const response = await textToVoice(
        {
          text: inputText,
          voiceId: selectedVoice,
        },
        { responseType: "blob" }
      );
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.log("Error during TTS conversion:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <React.Fragment>
      <div className="text-to-voice-container" data-testid="text-to-voice-container">
        <h1 className="title" data-testid="title">Text to Speech (ElevenLabs)</h1>
        <textarea
          className="input-textarea"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter text here..."
          data-testid="text-input"
        />
        <div className="select-container" data-testid="select-container">
          <select
            className="voice-select"
            value={selectedVoice}
            onChange={e => setSelectedVoice(e.target.value)}
            data-testid="voice-select"
          >
            {voices.map((voice) => (
              <option key={voice.voiceId} value={voice.voiceId} data-testid={`voice-option-${voice.voiceId}`}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="convert-btn"
          onClick={handleTextToSpeech}
          data-testid="convert-button"
          disabled={failed || loader}
        >
          Convert to Speech
        </button>
        {loader && 
          <picture className='loader-wrap' data-testid="loader">
            <img src={loaderGif} alt="loading..." data-testid="loader-img" />
          </picture>
        }
        {audioUrl && <audio className="audio-player" controls src={audioUrl} data-testid="audio-player"></audio>} 
      </div>
    </React.Fragment>
  );
};

export default TextToVoice;
