import { useState } from 'react'

// These values are static once set and should not change. 
const topLevel = {
  payloadIdentifier: generateUUID(),
  payloadUUID: generateUUID(),
  payloadContent: null
}

function App() {

  const [profileName, setProfileName] = useState("Your Profile Name")


  return (
    <div className="container mx-auto">
      <form className='bg-slate-100'>
        <label htmlFor="profileName">Profile Name: </label>
        <br />
        <input type="text" id='profileName' placeholder={profileName} onChange={event => setProfileName(event.target.value)} />
        <br />
        <button className="bg-blue-400 px-4 py-2 mt-2 hover:bg-blue-300" onClick={() => generateFile(profileName.replace(/ /g, "_") + ".mobileconfig", topLevel)}>Generate File</button>
      </form>
      <hr className='my-10' />
      <h1>File Name: {profileName.replace(/ /g, "_")}</h1>
      <h1>Payload Identifier: {topLevel.payloadIdentifier}</h1>
      <h1>Payload UUID: {topLevel.payloadUUID}</h1>
    </div>
  )

}

// Function for generating the UUID values needed for the profile
function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}

// This fucntion generates a mobileconfig file containing the appropriate configuration.
function generateFile(fileName, fileData) {
  var textContent = 
`Payload Identifier: ${fileData.payloadIdentifier}
Payload UUID: ${fileData.payloadUUID}
`
  // Create a blob object representing text file
  var blob = new Blob([textContent], {type: 'text/plain'});

  // Create a download link element
  var downloadLink = document.createElement('a');

  // Create a URL for the blob object
  downloadLink.href = window.URL.createObjectURL(blob);

  // Set the file name and download attribute of the link
  downloadLink.download = fileName;

  // Append the link to the body of the document
  document.body.appendChild(downloadLink);

  // Simulate a click of the download link
  downloadLink.click();

  // Once the file is downloaded, we can remove the link from the document.
  document.body.removeChild(downloadLink);
}


export default App