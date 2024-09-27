const core = require("@actions/core");

const getMediakindAssets = async (accessToken, sourceProjectName) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", 'x-mkio-token': accessToken },
  };
  const response = await fetch(
    `https://api.mk.io/api/ams/${sourceProjectName}/assets`,
    options
  );
  return await response.json();
};

const createOrUpdateAsset = async (accessToken, projectDestinationName, assetName, storageAccountName) => {
  const body = {
    properties: {
      storageAccountName: storageAccountName,
    },
  };

  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      'x-mkio-token': accessToken
    },
    body: JSON.stringify(body)
  };

  await fetch(
    `https://api.mk.io/api/ams/${projectDestinationName}/assets/${assetName}`,
    options
  );
};

async function migrateVideos() {
  try {
    const accessToken = core.getInput("mediakind-access-token");
    const projectSourceName = core.getInput("mediakind-source-project");
    const projectDestinationName = core.getInput("mediakind-destination-project")
    const storageAccountName = core.getInput("destination-storage-account")
    const assets = await getMediakindAssets(accessToken, projectSourceName);
    const assetsList = assets.value; 
    for (const asset of assetsList) {
        await createOrUpdateAsset(accessToken, projectDestinationName, asset.name, storageAccountName)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

migrateVideos().catch(error => core.setFailed(error.message));