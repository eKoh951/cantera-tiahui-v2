export async function fetchLessonData(url: string): Promise<RepoContent> {
  return fetch(url, { next: { revalidate: 30 } }).then((res) => res.json());
}
