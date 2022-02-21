import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import {Styles} from './VoiceRecorder.style';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';

interface VoiceRecordProps {
  handleVoiceRecordResults: Function;
}

const VoiceRecord = (Props: VoiceRecordProps) => {
  const [, setResults] = useState([] as string[]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    function onSpeechStart() {
      setIsListening(true);
    }

    function onSpeechResults(e: SpeechResultsEvent) {
      console.log(e.value);
      if (e.value) {
        setResults(e.value);
        Props.handleVoiceRecordResults(e.value);
      }
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [Props]);

  async function startRecord() {
    setIsListening(true);
    setResults([]);
    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.log(e);
    }
  }

  async function stopRecord() {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={isListening ? stopRecord : startRecord}
      style={Styles.recorderButton}>
      <Animated.View style={Styles.recorderView}>
        <Icon
          name={'microphone'}
          type={'font-awesome'}
          color="gray"
          style={Styles.icon}
          size={100}
        />
        {isListening ? (
          <Text style={Styles.text}>Aperte para parar de gravar</Text>
        ) : (
          <Text style={Styles.text}>Aperte para gravar</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default VoiceRecord;
