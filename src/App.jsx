import Container from '@mui/material/Container';
import MainContainer from './Componants/MainContainer';
import './App.css'

function App() {
  return (
    <>
    <div style={{
      display:"flex",
      justifyContent:"center",
      width:"100vw",
      height:"100vh"
    }}>
    <Container maxWidth="lg">
      <div className='logo'>
          <h1 style={{fontSize:"22px"}}>( بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ )</h1>
          <p>﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾</p>
      </div>
      <MainContainer />
    </Container>
    </div>
    </>
        )
}

export default App
