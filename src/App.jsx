import { useState } from 'react'
import {generateFile, generateUUID } from "./Helpers/Helpers"

// These values are static once set and should not change. 
const topLevel = {
  PayloadIdentifier: generateUUID(),
  PayloadUUID: generateUUID(),
  PayloadContent: null
}

const subLevel = {
  PayloadIdentifier: "com.apple.ManagedClient.preferences." + topLevel.PayloadIdentifier,
  PayloadUUID: generateUUID()
}

function App() {

  const [PayloadDisplayName, setPayloadDisplayName] = useState("Your Profile Name")
  const [PreferenceDomain, setPreferenceDomain] = useState("com.some.app")


  return (
    <div className="container mx-auto">
      <form className='bg-slate-100'>
        <label htmlFor="profileName">Profile Name: </label>
        <br />
        <input type="text" id='profileName' placeholder={PayloadDisplayName} onChange={event => setPayloadDisplayName(event.target.value)} />
        <br />
        <br />
        <input type="text" id='PreferenceDomain' placeholder={PreferenceDomain} onChange={event => setPreferenceDomain(event.target.value)} />
        <br />
        <button className="bg-blue-400 px-4 py-2 mt-2 hover:bg-blue-300" onClick={() => generateFile(profileName.replace(/ /g, "_") + ".mobileconfig", topLevel, subLevel)}>Generate File</button>
      </form>
      <hr className='my-10' />
      <h1>File Name: {PayloadDisplayName.replace(/ /g, "_")}</h1>
      <h1>Payload Identifier: {topLevel.PayloadIdentifier}</h1>
      <h1>Payload UUID: {topLevel.PayloadUUID}</h1>
      <h1>Sub-Level Payload Identifier: {subLevel.PayloadIdentifier}</h1>
      <h1>Preference Domain: {PreferenceDomain}</h1>
    </div>
  )

}

export default App