type SettingsDynamicPageProps = {
  params: Promise<{ page: string }>
}

export default async function SettingsDynamicPage({
  params,
}: SettingsDynamicPageProps) {
  const { page } = await params

  return <h1 className="text-2xl font-semibold">Profile Settings: {page}</h1>
}
