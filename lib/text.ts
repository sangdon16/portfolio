export function knownText(value?: string | null) {
  const text = value?.trim();
  if (!text || /^placeholder\b/i.test(text)) return undefined;
  return text;
}

export function knownList(values?: string[]) {
  const items = values?.map((item) => knownText(item)).filter((item): item is string => Boolean(item));
  return items && items.length > 0 ? items : undefined;
}
