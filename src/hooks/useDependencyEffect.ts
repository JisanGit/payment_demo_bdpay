import { useEffect, useState } from "react";

function useDependencyEffect(effect, dependencies: any[]) {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    return effect();
  }, dependencies);
}

export default useDependencyEffect;
