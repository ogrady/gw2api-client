import {describe, it} from '@jest/globals';
import { join } from 'path'
import { checkTranspilation } from './helper'

describe('types', () => {
  it('should not have type errors', async () => checkTranspilation(join(__dirname, 'test', 'mocks')))
})
