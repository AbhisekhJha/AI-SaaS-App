import { supabaseClient } from './supabase'

const AI_USAGE_LIMIT = 5
const AI_USAGE_TABLE = 'ai_usage'

async function getUserId(event: any) {
  const session = await getUserSession(event)
  if (!session.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
    })
  }
  return session.user.id
}

export async function getAiUsage(event: any) {
  const userId = await getUserId(event)
  const supabase = supabaseClient()
  const { data, error } = await supabase
    .from(AI_USAGE_TABLE)
    .select('count')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load usage',
    })
  }

  const count = data?.count ?? 0
  return { count, limit: AI_USAGE_LIMIT }
}

export async function consumeAiUsage(event: any) {
  const userId = await getUserId(event)
  const supabase = supabaseClient()
  const { data, error } = await supabase
    .from(AI_USAGE_TABLE)
    .select('count')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load usage',
    })
  }

  const count = data?.count ?? 0

  if (count >= AI_USAGE_LIMIT) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Limit reached. Upgrade to continue.',
    })
  }

  const nextCount = count + 1
  const { error: upsertError } = await supabase
    .from(AI_USAGE_TABLE)
    .upsert({ user_id: userId, count: nextCount }, { onConflict: 'user_id' })

  if (upsertError) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update usage',
    })
  }
  return { count: nextCount, limit: AI_USAGE_LIMIT }
}

