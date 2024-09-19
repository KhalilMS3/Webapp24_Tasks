import Grid from "./components/Grid"
const students = [
  { id: "0106", name: "Khalil" },
  { id: "011", name: "Marius Wallin" },
];
function App() {

  return (
    <>
      <main>
        <Grid students={students}/>
      </main>
    
    </>
  )
}

export default App
