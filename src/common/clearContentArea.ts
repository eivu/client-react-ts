export function clearContentArea(): void {
  const arcadeCanvas = document.getElementById('canvas');
  arcadeCanvas?.remove();
}