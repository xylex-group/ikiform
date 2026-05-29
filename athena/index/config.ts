import { defineRegistry } from '@xylex-group/athena'
import { railwayDatabase } from './relations'

export const registry = defineRegistry({
  railway: railwayDatabase
})
