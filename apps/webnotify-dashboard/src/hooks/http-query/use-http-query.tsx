import { useState } from "react";
import { QUERY_STATUS } from "~/models/enums";

// TO DO - fix the typing to use generics of arguments of any type
// e.g.  <T extends any[]>(...args: T[]) => Promise<T>;
export type QueryFn = (...args: any) => Promise<any>;

// accepts the query function that makes the http call
// return the query status (Uninitialized, loading, success, error),
// a function to trigger the http callback with similar digital signature to it,
// and the result of the callback
// eslint-disable-next-line @typescript-eslint/ban-types
export const useHttpQuery = (
  httpCallback: QueryFn
): [QUERY_STATUS, QueryFn] => {
  const [queryStatus, setQueryStatus] = useState(QUERY_STATUS.UNINITIALIZED);

  const makeQuery: QueryFn = async (...args) => {
    let res: any = undefined;
    setQueryStatus(QUERY_STATUS.LOADING);
    try {
      res = await httpCallback(...args);
      setQueryStatus(QUERY_STATUS.SUCCESS);
    } catch (err) {
      console.error(err);
      setQueryStatus(QUERY_STATUS.ERROR);
      throw err;
    }
    return res;
  };

  return [queryStatus, makeQuery];
};
