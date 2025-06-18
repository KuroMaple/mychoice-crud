import './App.css'
import { Container, Heading } from "@chakra-ui/react"
import Items from './components/ui/Items.tsx'
import NewItemForm from '@/components/ui/NewItemForm'
import { useState } from 'react'
function App() {

  // State to force refetch
  const [reloadFlag, setReloadFlag] = useState(false)

  // Function to toggle reloadFlag, triggering refetch
  const refetchItems = () => {
    setReloadFlag((prev) => !prev);
  }

  return (
    <>
      <Container my={40} maxW="container.xl" centerContent>
        <Heading size="6xl">
          Welcome to the MyChoice CRUD App!
        </Heading>
        <NewItemForm onItemCreated={refetchItems}/>
        <Items reloadFlag={reloadFlag}/>
      </Container>
    </>
  )
}

export default App
