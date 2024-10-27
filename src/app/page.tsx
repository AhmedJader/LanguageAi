'use client';
import 'regenerator-runtime/runtime';// for speech recognition
import TextArea from "./components/input/TextArea.jsx";
import FileUpload from "./components/input/FileUpload.jsx";
import LinkPaste from "./components/input/LinkPaste.jsx";
import {rtfToText} from "./utils/rtfToText.js";
import React, {useState, ChangeEvent} from "react";
import SpeechRecognitionComponent from "./components/speechrecognition/SpeechRecognition.jsx";
import { IconFileUpload, IconVolume } from '@tabler/icons-react';
import useTranslate from "./hooks/useTranslate.jsx";
import LanguageSelector from "./components/input/LanguageSelector.jsx";
export default function Home() {

  const [sourceText, setSourceText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<boolean>(false);
  const [languages] = useState<string[]>(["French", "Spanish", "German", "Japanese"]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0]);

  const targetText = useTranslate(sourceText, selectedLanguage);
  
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
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
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
                  <div className="grid w-full gap-4 md:grid-cols-2 grid-cols-1">
                    <div className="resize-y overflow-hidden relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-2xl bg-neutral-900 border-neutral-600/40 shadow-gray-900/100">
                    {/*gave div above a resize-y option, and added overflow-hidden to hide scroll bar*/}
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
                          <LinkPaste handleLinkPaste={handleLinkPaste}/> {/*link icon*/}
                        </span>
                        <span className='text-sm pr-4'>
                          {sourceText.length} / 2000
                        </span>
                      </div>
                    </div>

                    <div className="resize-y overflow-hidden relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-2xl bg-neutral-900 border-neutral-600/40 shadow-gray-900/100">
                      <TextArea id='target-language' value={targetText} onChange={() => {}} placeholder="Target Language" />
                        <div className='flex flex-row justify-between w-full'>
                          <span className='cursor-pointer flex space-x-2 flex-row items-center'>
                            <LanguageSelector
                              selectedLanguage={selectedLanguage}
                              setSelectedLanguage={setSelectedLanguage}
                              languages={languages}
                            />
                          </span>
                        </div>
                        {/*icons and buttons*/}
                      <div className="flex flex-row justify-between w-full">
                        <span className="cursor-pointer flex space-x-2 flex-row">
                          <SpeechRecognitionComponent setSourceText={setSourceText}/> {/*speech recognition component*/}
                          <IconVolume size={22} className="text-gray-400" onClick={() => handleAudioPlayback(targetText)}/> {/*volume icon*/}
                          <FileUpload handleFileUpload={handleFileUpload}/> {/*upload icon*/}
                          <LinkPaste handleLinkPaste={handleLinkPaste}/> {/*link icon*/}
                        </span>
                        <span className='text-sm pr-4'>
                          {sourceText.length} / 2000
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
