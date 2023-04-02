import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProgressBar() {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsloading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsloading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div>
          <motion.div></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
