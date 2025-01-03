export function tearDownContentArea(): void {
  const arcadeCanvas = document.getElementById('canvas');
  arcadeCanvas?.remove();
}