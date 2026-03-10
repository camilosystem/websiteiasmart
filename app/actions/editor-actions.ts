'use server'

import { Redis } from '@upstash/redis'
import { defaultEditorConfig, EditorConfig } from '@/lib/editor-defaults'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const EDITOR_CONFIG_KEY = 'iasmart:editor-config'

export async function getEditorConfig(): Promise<EditorConfig> {
  try {
    const stored = await redis.get<EditorConfig>(EDITOR_CONFIG_KEY)
    if (stored) {
      return { ...defaultEditorConfig, ...stored }
    }
  } catch {
    // fall through to default
  }
  return defaultEditorConfig
}

export async function saveEditorConfig(config: EditorConfig): Promise<{ success: boolean }> {
  try {
    await redis.set(EDITOR_CONFIG_KEY, config)
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function resetEditorConfig(): Promise<{ success: boolean }> {
  try {
    await redis.del(EDITOR_CONFIG_KEY)
    return { success: true }
  } catch {
    return { success: false }
  }
}
