const paths = {
  agreement: (
    <>
      <path d="M7 3.5h7.5L19 8v12.5H7z" />
      <path d="M14.5 3.5V8H19" />
      <path d="M10 12.5h6M10 16h4" />
    </>
  ),
  recipients: (
    <>
      <circle cx="9" cy="9" r="2.25" />
      <circle cx="16" cy="10" r="1.75" />
      <path d="M4.75 18.5c.6-2.3 2.4-3.5 4.25-3.5s3.65 1.2 4.25 3.5" />
      <path d="M13.5 15.2c.7-.4 1.5-.6 2.4-.6 1.5 0 2.9.8 3.4 2.4" />
    </>
  ),
  approval: (
    <>
      <circle cx="12" cy="12" r="7.25" />
      <path d="M8.5 12.2 11 14.6l4.6-5.2" />
    </>
  ),
  funds: (
    <>
      <rect x="3.5" y="6.5" width="17" height="11" rx="2" />
      <path d="M3.5 10.5h17" />
      <path d="M7 14.5h4" />
    </>
  ),
  milestones: (
    <>
      <path d="M6 20.5V4.5" />
      <path d="M6 5.5h9.5l-2 3.25 2 3.25H6" />
    </>
  ),
  achievement: (
    <>
      <path d="M8 4.5h8v5.2a4 4 0 0 1-8 0z" />
      <path d="M8 6.5H5.5A2.5 2.5 0 0 0 8 10" />
      <path d="M16 6.5h2.5A2.5 2.5 0 0 1 16 10" />
      <path d="M12 13.7V16" />
      <path d="M9 19.5h6" />
      <path d="M10 16h4v3.5h-4z" />
    </>
  ),
  review: (
    <>
      <path d="M8 4.5h8l2 2.2V19.5H8z" />
      <path d="M10.5 12.2 12.2 14l3.3-3.6" />
    </>
  ),
} as const;

export type StoryIconName = keyof typeof paths;

export function StoryIcon({ name }: { name: StoryIconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      {paths[name]}
    </svg>
  );
}
