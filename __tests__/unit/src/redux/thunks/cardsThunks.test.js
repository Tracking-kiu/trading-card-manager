import { setCards } from '../../../../../src/redux/actions/cardsActions'
import { cardFixture } from '../../../../assets/fixtures/realmCardsFixture'
import { queryCardByForm } from '../../../../../src/redux/thunks/cardsThunks'
import { formFields } from '../../../../assets/fixtures/cardSearchFormFixture'

import * as CardService from '../../../../../src/services/realm/cardService'
jest.mock('../../../../../src/services/realm/cardService')

describe('Cards thunks', () => {
  const mockDispatch = jest.fn()

  it('should query card by form', async () => {
    CardService.queryByForm = jest.fn(() => Promise.resolve(cardFixture))
    const expectedAction = setCards(cardFixture)

    const thunk = queryCardByForm(formFields)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
  })

  it('should throw an error if query fails', async () => {
    const testError = new Error('TEST ERROR - PLEASE IGNORE')
    CardService.queryByForm = jest.fn(() => Promise.reject(testError))

    try {
      const thunk = queryCardByForm(formFields)
      await thunk(mockDispatch)
    } catch (error) {
      expect(error).toEqual(testError)
    }

    expect.hasAssertions()
  })
})
