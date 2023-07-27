export async function fetchGithubContent(url: string): Promise<RepoContent> {
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
    },
    next: { revalidate: 30 }
  }).then((res) => res.json());
}
