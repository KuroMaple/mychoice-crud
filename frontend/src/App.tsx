import './App.css'
import { Container, Heading } from "@chakra-ui/react"
import Items from './components/ui/Items.tsx'
function App() {

  return (
    <>
      <Container my={40} maxW="container.xl" centerContent>
        <Heading size="6xl">
          Welcome to the MyChoice CRUD App!
        </Heading>
        
        <Items />
      </Container>
    </>
  )
}

export default App
