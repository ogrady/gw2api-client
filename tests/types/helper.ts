import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { stringify } from 'querystring'


type URLParams = Required<Parameters<typeof stringify>[0]>

const varName = (endpoint: string, type: string, suffix: string): string => (endpointAlias(endpoint) + type + suffix).replace(/\./g, '__').replace(/\W/g, '')  // FIXME: replace with .replaceAll
const endpointAlias = (endpoint: string): string => endpoint.split('/').at(-1)?.split('?').at(0) ?? endpoint  // split at '?' in case the endpoint is fully built with url parameters
const fileToPath = file => `../../../src/endpoints/schemas/responses/${file}`
const buildImport = (alias, file) => `import * as ${alias} from '${file}'`

function buildURL(endpoint: string, parameters: URLParams = {}): string {
    const base = `https://api.guildwars2.com/${endpoint}`
    const urlparams = stringify(parameters)
    return urlparams
        ? `${base}?${urlparams}`
        : base
}


async function buildTestAssignment(endpoint: string, parameters: URLParams, type: string, suffix = ''): Promise<string> {
    const url = buildURL(endpoint, parameters)
    console.info(`fetching data from ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`something went wrong while fetching data: ${response.status} ${response.statusText}`)
    }
    const json = await response.json()
    const alias = endpointAlias(endpoint)
    return `const ${varName(endpoint, type, suffix)}: ${alias}.${type} = ${JSON.stringify(json)}`
}

/**
 * Writes a mock request to a file, which can then be typechecked.
 * @param endpoint - endpoint suffix, e.g. 'v2/currencies'
 * @param parameters - list of parameter maps, e.g. {ids: 'all'}
 * @param file - file name that contains the type. Just the name, e.g. 'currencies'
 * @param type - type name from within that file, e.g. 'Schema_1970_01_01.Currency'
 * @returns 
 */
async function createTestFile(endpoint: string, parameters: URLParams[], file: string, type: string) {
    const assignments = await Promise.all(parameters.map((ps, i) => buildTestAssignment(endpoint, ps, type, ''+i)))
    const test = [buildImport(endpointAlias(endpoint), file)].concat(assignments).join('\n')
    const path = join(__dirname, 'mocks')
    console.info(`writing test file to ${path}`)
    return writeFile(join(path, `${endpointAlias(endpoint)}.ts`), test)
}

createTestFile('v2/currencies', [{ids: 'all'}, {}], fileToPath('currencies'), 'Schema_1970_01_01.Currency[]')

