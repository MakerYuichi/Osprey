import React, { useState } from 'react';
import checkToxicity from '../utils/toxicity';  // Function to check toxicity in message
import { updateKarma } from '../utils/karma';  // Function to update karma based on toxicity
import ReflectionWindow from './ReflectionWindow';  // Reflection window for showing toxicity feedback
import rephraseText from '../utils/rephrase'; 
import '../static/style3.css'; // Import rephrase function

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isToxic, setIsToxic] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [rephraseSuggestions, setRephraseSuggestions] = useState([]);
  const [loadingRephrase, setLoadingRephrase] = useState(false);

  const handleSend = async () => {
    if (message.trim() === '') {
      // Show an alert if the message is blank
      alert('Message is blank. Please type something.');
      return;
    }
  
    const toxic = await checkToxicity(message);
    if (toxic) {
      setIsToxic(true);
      setShowReflection(true);
      await handleRephraseClick();  // Trigger rephrasing when message is toxic
    } else {
      console.log('✅ Message Clean:', message);
      onSend({ text: message, isToxic: false });
      setMessage('');
    }
  };
  

  const handleSendMessage = (newMessage) => {
    onSend({ text: newMessage, isToxic: true });
    setMessage('');
    setShowReflection(false);
    setRephraseSuggestions([]); // Clear rephrase suggestions after sending the message
  };
  
  // Trigger rephrasing
  const handleRephraseClick = async () => {
    if (message.trim() === '') return;
  
    setLoadingRephrase(true);
    const rephrased = await rephraseText(message);  // Use the rephraseText function
  
    // Convert rephrased text to emojis (you can customize these emojis as needed)
    const emojiRephrase = convertToEmoji(rephrased);
    setRephraseSuggestions([emojiRephrase]);  // Store rephrased message in emoji form
    setLoadingRephrase(false);
  };

  // Convert text to emoji form
  const convertToEmoji = (text) => {
    const emojiText = text
      .replace(/\bstupid\b/g, '🤡💩😑')
      .replace(/\bidiot\b/g, '🤡👎😜')
      .replace(/\bbastard\b/g, '👿🔥💥')
      .replace(/\bbitch\b/g, '😡🔥👹')
      .replace(/\bdumb\b/g, '🤯😕💭')
      .replace(/\bfuck\b/g, '💣💥🔥')
      .replace(/\basshole\b/g, '💩🤬💥')
      .replace(/\btrash\b/g, '🗑️🚮💩')
      .replace(/\bgo away\b/g, '🚶‍♂️👋🙅‍♂️')
      .replace(/\bhell\b/g, '🔥😈💀')
      .replace(/\binsult\b/g, '🗣️💢💥')
      .replace(/\bjerk\b/g, '🤬👎🚫')
      .replace(/\bshut up\b/g, '🤐🙊🚫')
      .replace(/\bnasty\b/g, '🤢🤮💩')
      .replace(/\bpathetic\b/g, '😞💔😭')
      .replace(/\bpointless\b/g, '🤷‍♂️🙄💤')
      .replace(/\brude\b/g, '🙄💢🖕')
      .replace(/\bsuck\b/g, '🤮💀👎')
      .replace(/\bmoody\b/g, '😤🙄😠')
      .replace(/\bmanipulate\b/g, '🤐🎭🕵️‍♂️')
      .replace(/\bungrateful\b/g, '🙁😒🚫')
      .replace(/\bdisrespect\b/g, '😡💢👎')
      .replace(/\bdrama\b/g, '🎭🔥😡')
      .replace(/\bfake\b/g, '🤥💀🙅‍♂️')
      .replace(/\bblame\b/g, '🙅‍♂️👎🖕')
      .replace(/\bcry\b/g, '😭😢💔')
      .replace(/\bloser\b/g, '💔🙁😞')
      .replace(/\bmanipulate\b/g, '🎭🕵️‍♂️😒')
      .replace(/\bfake\b/g, '🤥💀😈')
      .replace(/\bnonsense\b/g, '🤪🙄💤')
      .replace(/\bvulgar\b/g, '💀🤢👎')
      .replace(/\bworst\b/g, '😱😔💔')
      .replace(/\bmoody\b/g, '😤👿💢')
      .replace(/\bdrama\b/g, '🔥🎭😡')
      .replace(/\bshithole\b/g, '💩💥👎')
      
      // Adding more toxic words from the list
      .replace(/\brape\b/g, '🚨❌😡')
      .replace(/\brapist\b/g, '🚨❌😡')
      .replace(/\bporn\b/g, '🍑💻🔞')
      .replace(/\bporno\b/g, '🍑💻🔞')
      .replace(/\bsex\b/g, '💋🌶️🔥')
      .replace(/\bsexy\b/g, '💋🔥💃')
      .replace(/\borgy\b/g, '🍑💃🕺')
      .replace(/\bgangbang\b/g, '🚨💥❌')
      .replace(/\bfetish\b/g, '🎭😈🖤')
      .replace(/\bhorny\b/g, '🌶️🔥🤤')
      .replace(/\bslut\b/g, '👠💋💄')
      .replace(/\bbitch\b/g, '😡🔥👹')
      .replace(/\bcunt\b/g, '😡🔥👹')
      .replace(/\bdildo\b/g, '🍑🛒🎁')
      .replace(/\bsuck\b/g, '🤮💀👎')
      .replace(/\bmasturbate\b/g, '🍑🔞💥')
      .replace(/\bmasturbation\b/g, '🍑🔞💥')
      .replace(/\bmolest\b/g, '🚨❌😡')
      .replace(/\bmolester\b/g, '🚨❌😡')
      .replace(/\bejaculate\b/g, '💦🔥🙄')
      .replace(/\berection\b/g, '🍆🔥💥')
      .replace(/\bpenis\b/g, '🍆💥🌶️')
      .replace(/\bvagina\b/g, '🍑🌶️💥')
      .replace(/\bboobs\b/g, '🍒💥🔥')
      .replace(/\btits\b/g, '🍒🔥🔥')
      .replace(/\bnipples\b/g, '🍒🍑🔥')
      .replace(/\bass\b/g, '🍑🔥💥')
      .replace(/\balls\b/g, '🍑🔥💥')
      .replace(/\bdick\b/g, '🍆🔥😈')
      .replace(/\bcock\b/g, '🍆🔥🔥')
      .replace(/\bthot\b/g, '👠💋💄')
      .replace(/\bhoe\b/g, '💋🔥👠')
      .replace(/\bescort\b/g, '💋🔥🚶‍♀️')
      .replace(/\bcamgirl\b/g, '📷💋🔞')
      .replace(/\bstripping\b/g, '👠💃🎉')
      .replace(/\bstrip\b/g, '👠💃🎉')
      .replace(/\bstripper\b/g, '👠💃🎉')
      .replace(/\borgasm\b/g, '💥🔥🍑')
      .replace(/\bbangbros\b/g, '💥🔥🎬')
      .replace(/\bredtube\b/g, '🎥🍑🔞')
      .replace(/\bxvideos\b/g, '🎥🍑🔞')
      .replace(/\bxnxx\b/g, '🎥🍑🔞')
      .replace(/\bonlyfans\b/g, '💋🍑🎬')
      .replace(/\badult\b/g, '🔥🔞🍑')
      .replace(/\bhardcore\b/g, '🔥💥🍑')
      .replace(/\bkinky\b/g, '🎭🔥💋')
      .replace(/\bbdsm\b/g, '🖤🔥🍑')
      .replace(/\bcreampie\b/g, '🍑💦🔥')
      .replace(/\banal\b/g, '🍑🔥💥')
      .replace(/\bblowjob\b/g, '💋🍑🔞')
      .replace(/\bhandjob\b/g, '🍑🖐️🔥')
      .replace(/\bdeepthroat\b/g, '🍑💥😈')
      .replace(/\bgagging\b/g, '💀💥🔥')
      .replace(/\bhentai\b/g, '🎥👹🔥')
      .replace(/\bincest\b/g, '🚨❌❗')
      .replace(/\bpegging\b/g, '🍑💥🔞')
      .replace(/\brimjob\b/g, '🔥🍑💋')
      .replace(/\bwet\b/g, '💦🔥🍑')
      .replace(/\bleak\b/g, '💀🔥❌')
      .replace(/\bleaked\b/g, '📰⚠️🔞')
      .replace(/\bexpose\b/g, '📰⚠️💥')
      .replace(/\bchoke\b/g, '🚨💥😵')
      .replace(/\babuse\b/g, '❌⚠️🔥')
      .replace(/\bharass\b/g, '❌🛑🔥')
      .replace(/\bsexual\b/g, '💋🔥🍑')
      .replace(/\bsexually\b/g, '🍑💋🔥')
      .replace(/\bgrooming\b/g, '🚨❌😡')
      .replace(/\bpredator\b/g, '🚨❌😡')
      .replace(/\bpedo\b/g, '🚨❌❗')
      .replace(/\bpedophile\b/g, '🚨❌😡');
  
    return emojiText;
  };
  

  return (
    <div className="text-white">
      {/* 📝 Message Input */}
      <div className="relative mb-4">
        <textarea
          className="message"
          rows="3"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded shadow"
        >
          Send
        </button>
      </div>

      {/* 🚨 Toxicity Message */}
      {isToxic && message.trim() && !showReflection && (
        <div className="text-yellow-400 text-sm mb-3">
          ⚠️ This message may be toxic:
          <div className="italic text-white mt-1">“{message}”</div>
        </div>
      )}

      {/* 🪞 Reflection Modal */}
      {showReflection && (
        <ReflectionWindow
          originalMessage={message}
          onClose={() => setShowReflection(false)}
          sendMessage={handleSendMessage}
        />
      )}

      {/* 💬 Rephrase Suggestions in Emoji */}
      {rephraseSuggestions.length > 0 && !loadingRephrase && (
        <div className="rephrase-suggestions mt-4">
          <h3>Suggested Rephrases:</h3>
          <ul>
            {rephraseSuggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => setMessage(suggestion)}
                  className="bg-gray-200 p-2 rounded"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading Rephrase */}
      {loadingRephrase && <div>Loading rephrased suggestions...</div>}
    </div>
  );
};

export default ChatInput;
