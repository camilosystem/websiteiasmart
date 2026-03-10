import { getEditorConfig } from '@/app/actions/editor-actions'
import { HomeClient } from '@/components/home-client'

export default async function Home() {
  const config = await getEditorConfig()
  return <HomeClient config={config} />
}
