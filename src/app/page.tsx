'use client';
import 'regenerator-runtime/runtime';// for speech recognition
import TextArea from "./components/input/TextArea.jsx";
import FileUpload from "./components/input/FileUpload.jsx";
import {rtfToText} from "./utils/rtfToText.js";
import React, {useState, ChangeEvent} from "react";
import SpeechRecognitionComponent from "./components/speechrecognition/SpeechRecognition.jsx";
import { IconFileUpload, IconVolume } from '@tabler/icons-react';
export default function Home() {

  const [sourceText, setSourceText] = useState<string>('');

  const handleAudioPlayback = (text:string) => {
    const utterance = new SpeechSynthesisUtterance(text); // converts text to speech
    window.speechSynthesis.speak(utterance); // speaks the text
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent); // converts RTF to plain text 
        setSourceText(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div> 
      <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="relative overflow-hidden h-screen">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
              <div className="text-center">
                <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">OpenAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Translater</span></h1>
                <p className="mt-3 text-neutral-400">
                  Utilizing OpenAI to computate speech recognition and translation services 
                </p>

                <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                  <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                      {/*component box holding text element, and icons/buttons */}
                      <TextArea 
                      id='source-language'
                      value={sourceText}
                      onChange={(e:ChangeEvent<HTMLTextAreaElement>) => 
                      {setSourceText(e.target.value)}}
                      placeholder="Enter Text To Translate"
                      />
                      {/*icons and buttons*/}
                      <div className="flex flex-row justify-between w-full">
                        <span className="cursor-pointer flex space-x-2 flex-row">
                          <SpeechRecognitionComponent setSourceText={setSourceText}/> {/*speech recognition component*/}
                          <IconVolume size={22} className="text-gray-400" onClick={() => handleAudioPlayback(sourceText)}/> {/*volume icon*/}
                          <FileUpload handleFileUpload={handleFileUpload}/> {/*upload icon*/}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
