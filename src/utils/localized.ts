export function getText(value: any, lang: 'en' | 'mr' | 'hi' = 'en'): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') {
    if (typeof value[lang] === 'string') return value[lang];
    if (typeof value.en === 'string') return value.en;
    if (typeof value.mr === 'string') return value.mr;
    if (typeof value.hi === 'string') return value.hi;
    if (value.title) return getText(value.title, lang);
    if (value.name) return getText(value.name, lang);
    if (value.label) return getText(value.label, lang);
    if (value.description) return getText(value.description, lang);
    if (value.shortDesc) return getText(value.shortDesc, lang);

    const values = Object.values(value);
    for (const v of values) {
      if (typeof v === 'string' && v.trim()) return v;
    }
  }
  return '';
}

export function safeArray<T = any>(value: any): T[] {
  if (Array.isArray(value)) return value;
  return [];
}
