import { useLayoutEffect, useState, useMemo } from "react";

export const useScreenSize = (query: string) => {
    const mediaQuery = useMemo(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query);
        }
        return null;
    }, [query]);

    const [matches, setMatches] = useState(mediaQuery?.matches ?? false);

    useLayoutEffect(() => {
        if (!mediaQuery) return;

        const updateMatch = () => setMatches(prev => {
            const newMatch = mediaQuery.matches;
            return prev !== newMatch ? newMatch : prev;
        });

        mediaQuery.addEventListener("change", updateMatch);
        return () => mediaQuery.removeEventListener("change", updateMatch);
    }, [mediaQuery]);

    return matches;
};
