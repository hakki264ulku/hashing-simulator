import './App.css';
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import TopContainer from './topContainer'

import {
  findNextPrime, LinkedList, newBucketsWithInputs,
  getSizeOfBuckets, mod
} from './hashing'


function App() {
  const DEFAULT_LOAD_FACTOR = 0.75

  const [inputs, setInputs] = useState([]) // array of integer values as input keys
  const [currentInput, setCurrentInput] = useState(0)
  const [currentInputRemove, setCurrentInputRemove] = useState(0)
  const [primeNumber, setPrimeNumber] = useState(2) // prime number is initialized as 2
  const [currentLoadFactor, setCurrentLoadFactor] = useState(0) // current load factor for the application will be shown to the users
  const [buckets, setBuckets] = useState([new LinkedList(), new LinkedList()]) // will contain linked list in it
  const [isRemoved, setIsRemoved] = useState(false)

 

  // The below code piece works when the 'inputs' list changes (insert or remove operations)
  useEffect(() => {
    // if it's a removal change
    if (isRemoved) {
      setIsRemoved(false)

      let newBuckets = newBucketsWithInputs(inputs, primeNumber)
      setBuckets(newBuckets)
      setCurrentInputRemove(0)

      setCurrentLoadFactor(1.0*getSizeOfBuckets(newBuckets)/primeNumber)

      return
    }

    if (inputs.length !== 0) {
      let hashValue = mod(currentInput, primeNumber) // hashed value with h(x) = key % prime

      //add hash node to the buckets
      buckets[hashValue].addNode(currentInput)

      setCurrentLoadFactor(1.0 * getSizeOfBuckets(buckets) / primeNumber)

      if (1.0 * getSizeOfBuckets(buckets) / primeNumber >= DEFAULT_LOAD_FACTOR) {
        let nextPrime = findNextPrime(primeNumber)

        setPrimeNumber(nextPrime)

        let newBuckets = newBucketsWithInputs(inputs, nextPrime)
        setBuckets(newBuckets)

        setCurrentLoadFactor(1.0 * getSizeOfBuckets(buckets) / nextPrime)
      }
      setCurrentInput(0)
    }
  }, [inputs])



  const handleInsertSubmit = (e) => {
    e.preventDefault()

    if (currentInput !== 0 && (!currentInput || isNaN(currentInput))) {
      alert("Input value cannot be a NaN(Not a Number) value!")
      return
    }

    setInputs(inputs.concat(currentInput))
  }

  const handleRemoveSubmit = (e) => {
    e.preventDefault()
    
    //Remove only one element
    let flag = true
    let newInputs = inputs.filter(i => {
      if (i === currentInputRemove && flag) {
        console.log(currentInputRemove + ": " + i)
        flag = false
        return false
      }
      return true
    })

    setIsRemoved(true)
    setInputs(newInputs)
  }

  return (
    <MainContainer>
      <TopContainer />
      <Title>Hashing Simulator</Title>

      <ApplicationContainer>

        <OuterContainer>
          <FormsContainer>
            <InsertForm onSubmit={e => handleInsertSubmit(e)}>
              <Input placeholder='Enter the insert value' value={currentInput} onChange={e => setCurrentInput(e.target.value)} />
              <Button>Insert</Button>
            </InsertForm>
            <InsertForm onSubmit={e => handleRemoveSubmit(e)}>
              <Input placeholder='Enter the remove value' value={currentInputRemove} onChange={e => setCurrentInputRemove(e.target.value)} />
              <Button>Remove</Button>
            </InsertForm>
          </FormsContainer>

          <ShowContainer>
          <Info>Default Load Factor: {DEFAULT_LOAD_FACTOR}</Info>
            <Info>Current Load Factor: {currentLoadFactor.toFixed(4)}</Info>
            <span>Inputs: </span>
            <Inputs>[
              {inputs.map(i => `${parseInt(i)}, `)}
            ]
              </Inputs>
          </ShowContainer>

            <ResetButton onClick={()=>window.location.reload()}>Reset All</ResetButton>

        </OuterContainer>


        <HashTableContainer>
          <BucketsContainer>
            <BucketTitleContainer>
              <BucketTitle>Index</BucketTitle>
              <BucketTitle>Keys</BucketTitle>
            </BucketTitleContainer>
            {buckets.map((b, i) => (
              <Bucket key={i}>
                <BucketIndex>{`${i} ->`}</BucketIndex>
                {b.returnArrayOfLList().map(node => (
                  <BucketItem key={node.data}>{`${node.data} -> (${node.occurence})`}</BucketItem>
                ))}

              </Bucket>
            ))}
          </BucketsContainer>
        </HashTableContainer>

      </ApplicationContainer>

    </MainContainer>
  );
}

export default App;


// Styled ~ Components //
const MainContainer = tw.div`w-full h-screen font-sans pt-3`
const Title = tw.h1`mt-8 font-bold text-gray-900 text-4xl text-center shadow-xl p-2`

const ApplicationContainer = tw.div`mt-4 flex flex-col mx-2 h-screen `

const OuterContainer = tw.div`flex justify-around mt-3`

const FormsContainer = tw.div`mr-3`
const InsertForm = tw.form`mb-2 flex ml-3`
const Button = tw.button`px-2 py-1 ml-2 font-bold text-white text-lg bg-gray-400 hover:bg-gray-500
 hover:cursor-pointer border-none rounded-lg focus:outline-none`
const Input = tw.input`rounded-lg p-1 focus:outline-none
shadow rounded text-gray-700`

const ShowContainer = tw.div`bg-gray-500 rounded-lg p-2 text-white`
const Inputs = tw.span``
const Info = tw.div`mb-2`

const ResetButton = tw.button`px-2 py-1 ml-2 font-bold text-white text-lg bg-red-500 hover:bg-red-600
hover:cursor-pointer border-none rounded-lg focus:outline-none`

const HashTableContainer = tw.div`p-1`
const BucketsContainer = tw.div`flex flex-col justify-around flex-nowrap bg-gray-600 rounded-lg `
const Bucket = tw.div`font-bold bg-gray-400 rounded-lg m-1 text-white flex`
const BucketIndex = tw.div`font-bold bg-gray-400 rounded p-1 text-white mr-2`
const BucketItem = tw.div` bg-gray-500 p-1 rounded-lg`
const BucketTitleContainer = tw.div`flex justify-between w-1/6 px-1`
const BucketTitle = tw.div`font-bold rounded-lg m-1 text-white flex`

