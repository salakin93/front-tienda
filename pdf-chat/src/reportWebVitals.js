import { onCLS, onLCP, onFID } from 'web-vitals';

export function reportWebVitals() {
  onCLS(console.log);
  onLCP(console.log);
  onFID(console.log);
}