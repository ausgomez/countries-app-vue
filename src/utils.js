import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite.setEndpoint(process.env.VUE_APP_APPWRITE_ENDPOINT).setProject(process.env.VUE_APP_APPWRITE_PROJECT)

export { appwrite }
