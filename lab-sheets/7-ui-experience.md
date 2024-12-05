# Lab 7: UI Best Practices

We've all experienced bad UI practices in the web applications we use. With AI applications, and specifically chatbots, it is hard to build an intuitive and performant experience.

In this section we'll cover some utilities exposed by AI UI SDK to help us build an intuitive and responsive experience in our React applications.

## Steps

For each extended practice, follow the below snippets:

### Spinner

To show a loading spinner while the chatbot is processing the user's message, you can use the `isLoading` state returned by the `useChat` hook:

```tsx
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {/* messages mapping omitted **/}

      { isLoading && (
        <div>
          <Spinner />
        </div>
      ) }

      {/* submit form omitted **/}
    </div>
  );
}
```

The above snippet will show a loading animation when awaiting a response.

### Stop Button

What is the user changes their mind and wants to stop the request? It happens! We need to include a stop button as well to improve their experience. The best place for this button would be in the `<div className="spinner_container">` element in `oscar/page.tsx`:

```tsx
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {/* messages mapping omitted **/}

      { isLoading && (
        <div>
          <Spinner />
          <button id="stop__button" type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      ) }

      {/* submit form omitted **/}
    </div>
  );
}
```

### Error Handling

There are numerous errors that can happen in a RAG application given the number of moving parts, including, but not limited to:

1. Embedding errors.
2. Network issues.
3. LLM generation errors.
4. Exceeding limits, including costs, number of requests.
5. Streaming issues, particularly in our case.

Exposing which error took place is a bad idea. From a security standpoint you are exposing details of your system that could make it susceptible to [software](https://owasp.org/www-project-top-ten/) and [LLM specific attacks](https://owasp.org/www-project-top-10-for-large-language-model-applications/).

The `useChat` hook we are using exposes the `error` property and `reload` method to handle these situations gracefully:

The  `error` property will expose the error, and allow us to add a retry button and message at the right time:

```tsx
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {/* messages mapping and spinner omitted **/}

      { error && (
        <>
          <div className="error__container">Oscar has popped to the movies. Please try again later!</div>
          <button id="retry__button" type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      ) }

      {/* submit form omitted **/}
    </div>
  );
}
```

If relevant we should also consider disabling the input element as well:

```tsx
<form onSubmit={handleSubmit}>
        <input
          id="oscar__input"
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask me anything about movies..."
          onChange={handleInputChange}
          disabled={error != null}
        />
</form>
```

### Sources

### Example Facet

### Telemetry

### Testing

### Other Considerations

One glaring issue with our implementation is the lack of sanitization of our input. Sanitization is important for several reasons:

1. You may have requests outside of your domain that you don't want to action. For example, someone asking Oscar to generate code for a React component instead of using ChatGPT.
2. Other types of inappropriate, dangerous or forbidden requests.
3. Requests that may violate application usage policies.
4. Attempts to extract sensitive information using approaches such as prompt injection attacks.

There are other practices and tools available, outside of the scope of this workshop, that can help you. Check out [this piece from Elastic Security Labs](https://www.elastic.co/security-labs/embedding-security-in-llm-workflows) and open source tools such as [LLM-Guard](https://github.com/protectai/llm-guard), [LangKit](https://github.com/whylabs/langkit/tree/main) and [Open-Prompt Injection](https://github.com/liu00222/Open-Prompt-Injection).

## Expected Result

We now have better user experience having added all these elements!