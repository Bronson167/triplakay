import { useEffect } from "react";

export default function useHandleChunkError() {
  useEffect(() => {
    function handler(e) {
      const target = e?.target;
      if (target?.tagName === "SCRIPT" && target.src.includes("/assets/")) {
        console.warn("Chunk manquant, recharge forcée !");
        window.location.reload(); // recharge index.html qui pointe vers les bons fichiers
      }
    }
    window.addEventListener("error", handler, true);
    return () => window.removeEventListener("error", handler, true);
  }, []);
}
