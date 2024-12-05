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

What is the user changes their mind and wants to stop the request? It happens! We need to include a stop button as well to improve their experience. The best place for this button would be in the `<div className="spinner_container">` element:

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

### Sources

### Example Facet

### Telemetry

### Testing

## Expected Result