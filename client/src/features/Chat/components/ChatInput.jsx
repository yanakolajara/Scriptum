// import React, { useEffect } from 'react';
// import { createEntry } from '../../../api/entries';

// export default function ChatInput({
//   message,
//   loading,
//   setMessage,
//   sendMessage,
// }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // sendMessageStream(message);
//     sendMessage(message);
//   };

//   // todo: handle generate entry
//   const handleGenerateEntry = async () => {
//     try {
//       const res = await createEntry();
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='text'
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder='Type your message...'
//           required
//         />
//         <input type='submit' value='Send' disabled={loading} />
//       </form>
//       <button onClick={handleGenerateEntry}>Generate entry</button>
//     </div>
//   );
// }
