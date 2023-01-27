import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const disposeQueryMessage = (message) => {
  const router = useRouter();
  const { pathname } = router;

  const disposeId = useRef(null);

  const disposeMessage = () => {
    router.replace(pathname, pathname, { shallow: true });
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearInterval(disposeId);
    };
  }, [message]);
};
