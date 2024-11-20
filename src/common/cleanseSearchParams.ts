export function cleanseSearchParams(searchParams: URLSearchParams): URLSearchParams {
  if (searchParams.get('pageNum') === '1') {
    searchParams.delete('pageNum')
  }

  if (searchParams.get('letter') === '') {
    searchParams.delete('letter')
  }

  if (searchParams.get('category') === '') {
    searchParams.delete('category')
  }

  if (searchParams.get('s') === '') {
    searchParams.delete('letter')
  }
  return searchParams;
}