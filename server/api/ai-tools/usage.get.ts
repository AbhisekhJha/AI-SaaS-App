import { getAiUsage } from '../../utils/aiUsage'

export default defineEventHandler(async (event) => {
  return await getAiUsage(event)
})

