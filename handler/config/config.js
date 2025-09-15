const details = [
    {   name: "Age_Journey",
        storeFolder: "agejourney_upload",
        credit:-15,
        descriptionTrans:'Age Journey'
    },
    {
        name: "Age_Predictor",
        storeFolder: "agepredictor_upload",
        credit:-8,
        descriptionTrans:'Age Predictor'
    },
    {   name: "Baby_Genrater",
        storeFolder: "baby_upload",
        credit:-10,
        descriptionTrans:'Baby Generator'
    },
    {   name: "Change_Hair",
        storeFolder: "changehair_upload",
        credit:-50,
        descriptionTrans:'Change Hair'
    },
]
function getConfigByStoreFolder(name) {
    return details.find(
        (detail) => detail.name === name
    ) || null;
}

module.exports = {
    details,
    getConfigByStoreFolder
}