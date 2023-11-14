import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export function useAge(medianTime: number): string {
  const [age, setAge] = useState(
    `${formatDistanceToNow(medianTime * 1000)} ago`
  );
  // const currentBlockCount = await rpc.blockchain.getBlockCount();
  useEffect(() => {
    const interval = setInterval(() => {
      setAge(`${formatDistanceToNow(medianTime * 1000)} ago`);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [medianTime]);

  return age;
}
