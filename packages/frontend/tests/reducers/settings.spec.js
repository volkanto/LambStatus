import { listSettings, editSettings, addApiKey, removeApiKey } from 'actions/settings'
import settingsReducer from 'reducers/settings'

describe('Reducers/Settings', () => {
  const settings = {
    adminPageURL: 'admin',
    statusPageURL: 'status',
    serviceName: 'service',
    apiKeys: [{id: '1', value: '1'}, {id: '2', value: '2'}]
  }

  context('listSettingsHandler', () => {
    it('should set the settings state.', () => {
      const state = settingsReducer(undefined, listSettings(settings))
      assert.deepEqual(settings, state.settings)
    })

    it('should sort the api keys.', () => {
      const settingsWithCreatedDate = {
        ...settings,
        apiKeys: [{...settings.apiKeys[0], createdDate: '2'}, {...settings.apiKeys[1], createdDate: '1'}]
      }
      const state = settingsReducer(undefined, listSettings(settingsWithCreatedDate))
      assert(settings.apiKeys.length === state.settings.apiKeys.length)
      assert(state.settings.apiKeys[0].id === '2')
    })
  })

  context('editSettingsHandler', () => {
    it('should update the settings state.', () => {
      const newSettings = Object.assign({}, settings, {
        adminPageURL: 'newAdmin'
      })
      const state = settingsReducer({
        settings: [settings]
      }, editSettings(newSettings))
      assert.deepEqual(newSettings, state.settings)
    })

    it('should sort the api keys.', () => {
      const settingsWithCreatedDate = {
        ...settings,
        apiKeys: [{...settings.apiKeys[0], createdDate: '2'}, {...settings.apiKeys[1], createdDate: '1'}]
      }
      const state = settingsReducer(undefined, editSettings(settingsWithCreatedDate))
      assert(settings.apiKeys.length === state.settings.apiKeys.length)
      assert(state.settings.apiKeys[0].id === '2')
    })
  })

  context('addApiKeyHandler', () => {
    it('should add the new api key.', () => {
      const newApiKey = {id: '3', value: '3'}
      const state = settingsReducer({settings}, addApiKey(newApiKey))
      assert.deepEqual(settings.apiKeys.concat(newApiKey), state.settings.apiKeys)
    })
  })

  context('removeSettingHandler', () => {
    it('should delete the existing api key.', () => {
      const id = settings.apiKeys[0].id
      const state = settingsReducer({settings}, removeApiKey(id))

      assert(state.settings.apiKeys.length === settings.apiKeys.length - 1)
    })
  })
})