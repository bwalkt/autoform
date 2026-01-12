import { useState, useRef, useEffect, createElement } from "react";
import type { ReactElement } from "react";
import { Runner } from "./Runner";
import type { RunnerOptions } from "./types";

export interface UseRunnerProps extends RunnerOptions {
  disableCache?: boolean;
}

export interface UseRunnerReturn {
  element: ReactElement | null;
  error: Error | null;
}

export const useRunner = (props: UseRunnerProps): UseRunnerReturn => {
  const { code, scope, disableCache } = props;
  const elementRef = useRef<ReactElement | null>(null);
  const isMountedRef = useRef(false);

  const [state, setState] = useState<UseRunnerReturn>(() => ({
    element: null,
    error: null,
  }));

  useEffect(() => {
    // Skip the first render
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    // Create new Runner element
    const runnerElement = createElement(Runner, {
      code,
      scope,
      onRendered: (error: Error | null) => {
        if (error) {
          setState({
            element: disableCache ? null : elementRef.current,
            error,
          });
        } else {
          elementRef.current = runnerElement;
          setState({
            element: runnerElement,
            error: null,
          });
        }
      },
    });

    // Immediately set the element (will trigger onRendered callback)
    elementRef.current = runnerElement;
    setState({
      element: runnerElement,
      error: null,
    });
  }, [code, scope, disableCache]);

  // Initial render
  useEffect(() => {
    const runnerElement = createElement(Runner, {
      code,
      scope,
      onRendered: (error: Error | null) => {
        if (error) {
          setState({ element: null, error });
        } else {
          elementRef.current = runnerElement;
          setState({ element: runnerElement, error: null });
        }
      },
    });

    elementRef.current = runnerElement;
    setState({ element: runnerElement, error: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
