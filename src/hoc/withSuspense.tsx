import React from "react";

//WCP -> Wrapped Component Props

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}
