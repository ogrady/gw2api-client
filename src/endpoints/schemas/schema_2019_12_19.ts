import { Schema as BaseSchema } from './schema_2019_05_22'
import * as account from './responses/account'
import * as legends from './responses/legends'
import * as professions from './responses/professions'

export interface Schema extends Omit<BaseSchema, 'Account' | 'Legends' | 'Professions'> {
    Account: account.Schema_2019_12_19.Account
    Legends: legends.Schema_2019_12_19.Legend
    Professions: professions.Schema_2019_12_19.Profession
}