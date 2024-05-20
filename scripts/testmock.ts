import { createTestFile } from '../tests/types/helper'

const fileToPath = file => `../src/endpoints/schemas/responses/${file}`


createTestFile('v2/currencies', [{ids: 'all'}, {}], fileToPath('currencies'), 'Schema_1970_01_01.Currency[]')

