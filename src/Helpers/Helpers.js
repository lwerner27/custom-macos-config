import plist from "plist"

export function generateFile(fileName, topLevel, subLevel) {
    // JSON source for the PLIST 
    configurationProfile = {
        PayloadUUID: topLevel.PayloadUUID,
        PayloadType: "Configuration",
        PayloadIdentifier: topLevel.PayloadIdentifier,
        PayloadDisplayName: topLevel.PayloadDisplayName,
        // PayloadDescription: topLevel.PayloadDescription,
        PayloadVersion: 1,
        PayloadEnabled: true,
        PayloadRemovalDissallowed: true,
        PayloadScope: "System",
        PayloadContent: [
            {
                PayloadDisplayName: "Custom Settings",
                PayloadIdentifier: subLevel.PayloadIdentifier,
                PayloadType: "com.apple.ManagedClient.preferences",
                PayloadUUID: subLevel.PayloadUUID,
                PayloadVersion: 1,
                PayloadContent: {
                    [subLevel.PreferenceDomain]: {
                        Forced: [
                            {
                                mcx_preferences_settings: "Settings"
                            }
                        ]
                    }
                }
            }
        ]

    }

    // Convert the JSON to a PLIST String
    textContent = plist.build(configurationProfile)

    // Create a blob object representing text file
    var blob = new Blob([textContent], { type: 'text/plain' });

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

// A function for generating UUIDs
export function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}