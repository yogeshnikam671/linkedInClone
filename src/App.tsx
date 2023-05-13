import './App.css'
import Feed from './components/Feed/Feed'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'

function App() {

  return (
    <>
      <Header/>
      <div className="ml-[15%] mr-[15%] flex mt-8">
        <SideBar/>
        <Feed/>
        {/* <Widgets/> */ } 
      </div>
    </>
  )
}

export default App
