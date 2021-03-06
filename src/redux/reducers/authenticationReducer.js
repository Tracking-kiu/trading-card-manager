// @flow

import Immutable from 'immutable'
import type { Map } from 'immutable'
import { User } from '../../services/firebase/user'
import { SET_USER } from '../types'

export const initialState = Immutable.fromJS(new User({ email: '', emailVerified: '', uid: '', providerData: '' }))

export default function (state: Map = initialState, action: { [string]: Map }) {
  switch (action.type) {
    case SET_USER:
      return Immutable.fromJS(action.user)
    default:
      return state
  }
}
