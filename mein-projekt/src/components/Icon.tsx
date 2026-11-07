const paths = {
  bag: "M4 8h16l1 13H3L4 8Zm4 2V6a4 4 0 0 1 8 0v4",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m12-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  arrow: "M4 12h15m-6-6 6 6-6 6",
  back: "M20 12H5m6 6-6-6 6-6",
  mark: "M5 18C5 8 12 5 19 5c0 7-3 14-13 14m0 0 7-7",
  image: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15 8h.01",
};

export default function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
