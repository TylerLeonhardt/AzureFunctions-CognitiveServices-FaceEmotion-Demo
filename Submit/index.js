const fetch = require('node-fetch');

module.exports = async function (context, req) {

    if (req.query.url || (req.body && req.body.url)) {
        const imageUrl = req.query.url || req.body.url
        const faces = await getFacialAnalysisResults(imageUrl);
        const message = processFaces(faces);

        const body = `
            ${message}
            <h2>Image:</h2>
            <br />
            <img src="${imageUrl}" style="max-width:300px" />`
        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: { "Content-Type":"text/html" },
            body: body
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a url on the query string or in the request body"
        };
    }
};

async function getFacialAnalysisResults(imageUrl) {
    const faceUrlBase = process.env.CognitiveServicesUrlBase;
    const key = process.env.CognitiveServicesKey;

    // FaceLandmarks gives us a rectangle containing the face.
    // FaceAttributes=emotion will tell Cognitive Services to read the emotion of a face.
    const reqParams = "?returnFaceLandmarks=true&returnFaceAttributes=emotion";

    return await fetch(faceUrlBase + reqParams, {
        method: 'post',
        body:    JSON.stringify({ url: imageUrl }),
        headers: { 
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/json"
        },
    }).then(res => res.json())
}

function processFaces(faces) {
    let angerCount = 0;
    let contemptCount = 0;
    let disgustCount = 0;
    let fearCount = 0;
    let happinessCount = 0;
    let neutralCount = 0;
    let sadnessCount = 0;
    let surpriseCount = 0;

    for (const face of faces)
    {
        var emotion = face.faceAttributes.emotion;

        if (emotion.anger > 0.1)
        {
            angerCount += 1;
        }
        if (emotion.contempt > 0.1)
        {
            contemptCount += 1;
        }
        if (emotion.disgust > 0.1)
        {
            disgustCount += 1;
        }
        if (emotion.fear > 0.1)
        {
            fearCount += 1;
        }
        if (emotion.happiness > 0.1)
        {
            happinessCount += 1;
        }
        if (emotion.neutral > 0.1)
        {
            neutralCount += 1;
        }
        if (emotion.sadness > 0.1)
        {
            sadnessCount += 1;
        }
        if (emotion.surprise > 0.1)
        {
            surpriseCount += 1;
        }
    }

   return `<h2>For ${faces.length} detected faces:</h2>` +
       `- ${angerCount} were angry<br />` +
       `- ${contemptCount} showed contempt<br />` +
       `- ${disgustCount} showed disgust<br />` +
       `- ${fearCount} showed fear<br />` +
       `- ${happinessCount} showed happiness<br />` +
       `- ${neutralCount} were neutral<br />` +
       `- ${sadnessCount} were sad<br />` +
       `- ${surpriseCount} were surprised.`;
}
