import './App.css';
import tw from 'twin.macro'

function TopContainer() {

  return (
      <MainContainer>

        <ProfileContainer>
          <Image src='ppp.jpeg' />
          <InfoAboutDeveloperContainer>
            <Title>Hakkı ÜLKÜ</Title>
            <No>172010020024</No>
            <Explanation>
              Design and Analysis of Algorithms
          </Explanation>
            <Explanation>Programming Homework 1</Explanation>
          </InfoAboutDeveloperContainer>
        </ProfileContainer>



        <ApplicationExplanationContainer>
          <ApplicationTitle>Hashing Simulator</ApplicationTitle>
          <AppExplanation>
            This application built to simulate hashing.
          </AppExplanation>
          <AppExplanation>
            Application uses the prime numbers as hash functions in the ascending order.
            Loading factor approach is applied to the application for the sake of uniform distributiton.
            When the load factor exceeds the default load factor, input keys are rehashed with the next prime number. Also,
            the same keys are not saved inside new nodes instead they are counted as occurrences. This behaves as a collision handler.
          </AppExplanation>
        </ApplicationExplanationContainer>
        
      </MainContainer>

  );
}

export default TopContainer;


// Styled ~ Components //

const MainContainer = tw.div`flex justify-around`

const ProfileContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4
flex items-start`
const Image = tw.img`rounded-full w-32 md:w-48`
const InfoAboutDeveloperContainer = tw.div`ml-16`
const Title = tw.h2`font-bold text-gray-900 text-4xl`
const No = tw.h3`font-bold text-xl text-gray-600 mt-1 mb-4`
const Explanation = tw.p`font-bold text-blue-800 text-xl`

const ApplicationExplanationContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4`
const ApplicationTitle = tw.h2`font-bold text-gray-900 text-4xl text-center mb-1`
const AppExplanation = tw.div`font-bold text-blue-800 text-base`
