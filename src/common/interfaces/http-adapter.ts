export interface HpppAdapter {
  get<T>(url: string): Promise<T>;
}
