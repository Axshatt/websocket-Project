import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(["Hi there", "hello", "lol"]);
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessage(m => [...m, event.data])
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

  }, [])

  return (
    <>
      <div className='h-screen bg-black p-px'>
        <div className='h-[95vh] mt-[5vh]'>{message.map(message => <div
          className='m-8'>

          <span
            className="p-4 m-8 rounded bg-white text-black">
            {message}
          </span>
        </div>)}</div>
        <div className="w-full flex  bg-white">
          <input id="message"className=" flex-1" type='text' />
          <button className="bg-blue-600 p-4 text-white p-4 cursor-pointer"
            onClick={() => {
              const message = (document.getElementById("message") as HTMLInputElement | null)?.value;
              if (wsRef.current) {
                wsRef.current.send(JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message
                  }
                }))
              }
            }}>Send Message</button>
        </div>

      </div>
    </>
  )
}

export default App
