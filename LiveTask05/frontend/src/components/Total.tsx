
export default function Total({ total }: Readonly<{ total: number }>) {
   if (total === 0) return null;
  return (
    <p>
      antall studenter: <b>{total}</b>
    </p>
  );
}
