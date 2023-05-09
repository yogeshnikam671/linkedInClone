import './App.css'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'

function App() {

  return (
    <>
      <Header/>
      <div className="ml-[15%] mr-[15%]">
        <SideBar/>
        {/*<Feed/>*/}
        {/* <Widgets/> */ } 
      </div>
    </>
  )
}

export default App
