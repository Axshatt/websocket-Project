
import './App.css'

function App() {


  return (
    <>
      <div className='h-screen bg-black p-px'>
        <div className='h-[95vh]'></div>
        <div className="w-full flex  bg-white">
          <input className=" flex-1" type='text' />
          <button className="bg-blue-600 p-4 text-white p-4 cursor-pointer" >Send Message</button>
        </div>

      </div>
    </>
  )
}

export default App
