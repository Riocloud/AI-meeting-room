# Install Node.js and npm, if you haven't already

Navigate to your project folder and run the following command to install Parcel as a development dependency:

>npm init -y
>
>npm install --save-dev parcel-bundler
>
>npm run build
>
>npm run start
>
>npm install ws
# Need to do Changes 
> - User authentication: Integrate a user authentication system (e.g., OAuth or JWT) to allow users to log in with an existing account, track their conversations, and save their avatars.
>
> - Custom user interface: Improve the user interface by creating a custom chat input area instead of using the browser's built-in prompt() function. This can include a text input field, a send button, and other chat-related features like emojis, attachments, or audio recording.
>
> - File sharing: Allow users to share files with each other by implementing file upload functionality. This could include uploading images, documents, or other files to a server, and displaying a preview or a link in the chat for other users to download or view the file.
>
> - Voice chat: Integrate a voice chat system using WebRTC or a similar technology to allow users to communicate via audio in addition to text. This would require updating both the client-side and server-side code to handle audio streams and manage the voice chat sessions.
>
> - Message history: Store chat history on the server and allow users to view previous messages when they join the chatroom. This can include implementing a database to store messages and metadata, and fetching the message history when a user joins the chatroom.
>
> - Typing indicators: Show typing indicators when users are composing messages. This can be achieved by listening for keyboard events in the chat input area and sending WebSocket messages to inform other users that someone is typing. The server can then broadcast this information to all clients.
>
> - Read receipts: Implement read receipts to show when messages have been seen by other users. This requires updating the client-side code to track which messages have been viewed and sending WebSocket messages to the server when a message is marked as read. The server can then broadcast this information to all clients.
