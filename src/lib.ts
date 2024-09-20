export function hello(): string {
  return `Hello: ${process.env.HOGE ?? ''}`;
}
export function add(a: number, b: number): number {
  return a + b;
}

function multiple(a: number, b: number): number {
  return a * b;
}

export default multiple;
