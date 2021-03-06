import { SettingsProxy } from 'api/utils'
import APIGateway from 'aws/apiGateway'
import { stackName } from 'utils/const'

export async function handle (event, context, callback) {
  try {
    const settings = new SettingsProxy()
    const apiGateway = await new APIGateway()
    const [serviceName, logoID, backgroundColor, adminPageURL, apiKeys] = await Promise.all([
      settings.getServiceName(),
      settings.getLogoID(),
      settings.getBackgroundColor(),
      settings.getAdminPageURL(),
      apiGateway.queryEnabledApiKey(stackName)
    ])
    const statusPageURL = await settings.getStatusPageURL()  // expect the cache is used

    callback(null, {serviceName, logoID, backgroundColor, adminPageURL, statusPageURL, apiKeys})
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    callback('Error: failed to get settings')
  }
}
