import * as C from 'constants'
import * as tts from '@google-cloud/text-to-speech'
import * as fs from 'fs'

class ExternalRequest {

    client = async () => 
            new tts.TextToSpeechClient()
    
    async convertToAudio(text :string, client :tts.TextToSpeechClient) {
        const request = {
            input: {text: text},
            voice: {
                languageCode: 'en-US', 
                ssmlGender: 'NEUTRAL'
            },
            audioConfig: {
                audioEncoding: 'MP3'
            },
        }

        client.synthesizeSpeech(request, (err, response) => {
            if (err)
                return

            fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
                if (err) {
                    console.error('ERROR:', err);
                    return;
                }
                console.log('Audio content written to file: output.mp3');
            });

        })

    }
}