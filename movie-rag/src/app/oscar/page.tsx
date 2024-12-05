'use client';

import { useChat } from 'ai/react';
import Spinner from '../components/Spinner';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.
        map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role === "assistant" ? "Oscar" : "Me"}</div>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      { isLoading && (
        <div className="spinner__container">
          <Spinner />
          <button id="stop__button" type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      ) }

      <form onSubmit={handleSubmit}>
        <input
          id="oscar__input"
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask me anything about movies..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}